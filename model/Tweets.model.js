const mongoose=require("mongoose");


const tweetSchema={
    title:{type:String, require:true},
    body:{type:String},
    category:{type:String, require:true},
    userEmail:String
}


const TweetModel=mongoose.model("tweet",tweetSchema)

module.exports={TweetModel}