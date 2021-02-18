const mongoose=require('mongoose');
const user=require('./../../models/usermodel');
const identify=require('./../error/identify-error');
const blogs=require('./../../models/blogmodel');
const { updateOne } = require('./../../models/usermodel');
const checke=require('./../error/check-blogs');

exports.delete=async (req,res,next)=>{
    const username=req.session.Username;
    const title=req.params.title;
    const posttype=req.params.posttype;
    if(posttype == "public")
    {
        try
     {const userdata=await user.updateOne({Username:username},{
         
         $pull:{
             Publicblogs:{Title:title}
         }
     });
     res.json({
         status:"Successfully deleted",
         user:userdata
     });}
     catch(err){
        res.json({
            Error:err.message
        });  
     }
    }
    else
    {
        try
        {const userdata=await user.updateOne({Username:username},{
         
            $pull:{
                Privateblogs:{Title:title}
            }
        });
        res.json({
            status:"Successfully deleted"
        });}
        catch(err){
            res.json({
                Error:err.message
            });  
         }
    }
}