const mongoose=require("mongoose");


const userSchema={
    name:{type:String, require:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    gender:{type:String, require:true},
    country:{type:String, require:true},
}


const UserModel=mongoose.model("account",userSchema)

module.exports={UserModel}