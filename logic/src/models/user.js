const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:Number},
    password:{type:String},
    googleId:{type:String},

})

const user = mongoose.model('User',userSchema)

module.exports = user