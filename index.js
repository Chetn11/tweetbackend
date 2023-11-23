const express=require("express");
require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {connection}=require("./config/db")
const {UserModel}=require("./model/User.model")
const {auth}=require("./middelware/auth")
const {tweetRouter}=require("./routes/Tweet.routes")
const cors=require("cors")




const app=express();

app.use(express.json());
app.use(cors({
    origin:"*"
}))


app.get("/",(req,res)=>{
    res.json({message:"Twitter Api is working"})
})

//signup
app.post("/signup", async (req,res)=>{
    const {name, email, password, gender, country}=req.body;
    const user_exist=await UserModel.findOne({email});
    if(user_exist)
    {
        console.log("User already exist please go to login page.");
        return res.json({message:"User already exist please go to login page."});
    }

    bcrypt.hash(password, 8, async function(err, hash) {
        await UserModel.create({name,email,password:hash,gender,country})
        return res.json({message:"Signup Completed !"})
    });
    
})



//login
app.post("/login", async (req,res)=>{
    const {email, password}=req.body;
    const user=await UserModel.findOne({email});
    if(!user)
    {
        console.log("User is not exist please signup first.");
        return res.json({message:"User is not exist please signup first."});
    }

    const hash_pass=user?.password;

    bcrypt.compare(password, hash_pass, async function(err, result) {
        if(result)
        {
            const token = jwt.sign({ userID: user._id }, "key");
            return res.json({message:"Login Completed.!", token:token});
        }
        else{
            return res.json({message:"Invalid Credentials"})
        }
    });
    
})

app.use(auth);

app.use("/tweet",tweetRouter)

app.listen(process.env.port || 8080, async()=>{

    try {
        await connection;
        console.log("Connected to mongodb server!");
    } catch (error) {
        console.log("Filed to connect mongodb...");
    }
    console.log("listening on port 8080");
})