const mongoose=require("mongoose");

const connection=mongoose.connect(process.env.DB);

module.exports={connection}