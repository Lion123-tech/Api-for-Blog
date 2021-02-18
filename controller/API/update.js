const mongoose=require('mongoose');
const user=require('./../../models/usermodel');
const identify=require('./../error/identify-error');
const blogs=require('./../../models/blogmodel');
const { updateOne } = require('./../../models/usermodel');
const checke=require('./../error/update-b');

exports.updateblogs=async (req,res,next)=>{
    const oldtitle=req.body.oldtitle;
    const newtitle=req.body.newtitle;
    const desc=req.body.desc;
    const posttype=req.body.posttype;
    const username=req.session.Username;
    const site=username+"/"+newtitle;
    let hh;
    if(oldtitle == newtitle)
      hh=true;
    if(posttype=="public")
    { if(oldtitle != newtitle)
         hh=await checke.check1(newtitle,username,user);
      if(hh)
      {
       try
        {const userdata=await user.updateOne({Username:username,"Publicblogs.Title":oldtitle},{
           $set:{
               "Publicblogs.$.Title":newtitle,
               "Publicblogs.$.Description":desc,
               "Publicblogs.$.Site":site,
               "Publicblogs.$.Date":new Date(),
           }
       });
       res.json({
           status:"successfully updated!",
           data:userdata
       });}
       catch(err){
           res.json({
               status:"fail",
               error:err.message
           });
       }
      }
      else
      {
        res.status(500).json({
            msg:"Already blogs with these title exist"
        });
      }
    }
    else
    {
        if(oldtitle != newtitle)
          hh=await checke.check1(newtitle,username,user);
        if(hh)
        {
            try
            {const userdata=await user.updateOne({Username:username,"Privateblogs.Title":oldtitle},{
               $set:{
                   "Privateblogs.$.Title":newtitle,
                   "Privateblogs.$.Description":desc,
                   "Privateblogs.$.Date":new Date(),
               }
           });
           res.json({
               status:"successfully updated!"
           });}
           catch(err){
               res.json({
                   status:"fail",
                   error:err.message
               });
           }
          }
          else
          {
            res.status(500).json({
                msg:"Already blogs with these title exist"
            });
          }
        }
        
    
}