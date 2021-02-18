const mongoose=require('mongoose');
const user=require('./../../models/usermodel');
const identify=require('./../error/identify-error');
const blogs=require('./../../models/blogmodel');
const { updateOne } = require('./../../models/usermodel');
const checke=require('./../error/check-blogs');
exports.create=async (req,res,next)=>{
    if(typeof (req.session.Username)==undefined || req.session.Username==null)
       res.send("Sorry!You are not authenticated!!");
    else if(req.body.title==""||req.body.desc==""||req.body.posttype=="")
       res.send("Title,Description and Post type are required!");
    else
    {
     const username=req.session.Username; 
     const title=req.body.title;
     const description=req.body.desc;
     
     const like=0;
     const date=new Date();
     const post_type=req.body.posttype;
     if(post_type === "public")
     {
        const site=req.session.Username+"/"+title;
        const hh=await checke.check1(title,req.session.Username,user);
        if(hh)
        {   
         try
         {
           const userdata=await user.updateOne({Username:username},{
               $push:{
                Publicblogs:{
                    Title:title,
                    Description:description,
                    Site:site,
                    Likes:0,
                    Date:date
                }
               }
           });
           res.status(200).json({
               status:"Pass",
               msg:"Successfully created blog"
           });
         }
         catch(err)
         {
            const errmsg=identify.create(err);
            res.status(500).json({
                message:"Fail",
                Error:errmsg,
                Err:err.message
            });
         }}
         else{
             res.status(500).json({
                 msg:"Already blogs with these title exist"
             });
         }
     }
     else{
        const hh=await checke.check2(title,req.session.Username,user);
        if(hh)
        {  
        try
        {
            const site=req.session.Username+"/private"+title;
            const userdata=await user.updateOne({Username:username},{
                $push:{
                 Privateblogs:{
                     Title:title,
                     Description:description,
                     Date:date
                 }
                }
            });
            res.status(200).json({
                status:"Pass",
                msg:"Successfully created blog"
            });
        }
        catch(err)
        {
            const errmsg=identify.create(err);
            res.status(500).json({
                message:"Fail",
                Error:errmsg,
                Err:err.message
            });
        }
     }
     else{
        res.status(500).json({
            msg:"Already blogs with these title exist"
        });
     }
     }
    }
}
