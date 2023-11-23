const express=require("express")
const {UserModel}=require("../model/User.model")
const {TweetModel}=require("../model/Tweets.model")


const tweetRouter=express.Router();



tweetRouter.get("/", async (req,res)=>{
    const tweet=await TweetModel.find();
    res.send({tweet:tweet});
})


// create
tweetRouter.post("/create", async (req,res)=>{
    const{title,body,category}=req.body;
  
    const userID=req.userID;

    const user=await UserModel.findOne({_id:userID});

    const tweet=await TweetModel.create({title,body,category});
    res.send({tweet:tweet});
})


// update 
tweetRouter.post("/edit/:tweetID", async (req,res)=>{
    const tweet=req.params.tweetID;

    const userID=req.userID;

    const user=await UserModel.findOne({_id:userID});
    

    const payload=req.body;
    await TweetModel.findOneAndUpdate({_id:userID},payload)
    res.send({message:"updated"})

})

// update 
tweetRouter.post("/edit/:tweetID", async (req,res)=>{
    const tweet=req.params.tweetID;

    const userID=req.userID;

    const user=await UserModel.findOne({_id:userID});
    

    await TweetModel.findOneAndDelete({_id:userID},payload)
    res.send({message:"Deleted"})

})



module.exports={tweetRouter}