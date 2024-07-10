const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:false,
    },
    phone:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
});
const User = mongoose.model("User",userSchema);
module.exports =User;