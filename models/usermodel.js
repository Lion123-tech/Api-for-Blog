const mongoose=require('mongoose');
const blogschema=require('./blogmodel');
const pblogs=require('./../models/private_blog');
const bcrypt=require('bcryptjs');
const userschema=mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Your name is required!"],
    },
    Username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username already exist"]
    },
    Password:{
        type:String,
        required:[true,"Password is required"],
    },
    Publicblogs:[blogschema],
    Privateblogs:[pblogs]
});

//
userschema.pre('save',async function(next){
    this.Password=await bcrypt.hash(this.Password,12);
    next();
});



//
userschema.methods.passwordcheck=async function(createp,userp){
    return await bcrypt.compare(createp,userp);
};
module.exports=mongoose.model("newblogs1",userschema);