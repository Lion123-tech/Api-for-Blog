const user=require('./../../models/usermodel');

exports.likes=async (req,res,next)=>{
    const username=req.params.username;
    const title=req.params.title;
    try{
        const data=await user.updateOne({
            Username:username,"Publicblogs.Title":title},{
                $inc:{
                  "Publicblogs.$.Likes":1
                }
            });
            res.json({
                Data:data
            });
    }
    catch(err){
        res.json({
            Error:err.message
        });
    }
}