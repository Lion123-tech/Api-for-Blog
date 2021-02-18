const user=require('./../../models/usermodel');
exports.getall=async (req,res,next)=>{
    const username=req.session.Username;
    try
    {
      const userblogs=await user.aggregate([
       { $match:{ Username:username }},
        {$unwind: '$Publicblogs'},

        {$sort: { 'Publicblogs.Date': -1 }},
    {$project:{
        Publicblogs:1,
        Privateblogs:1,
        _id:0
    }}]
     );
      res.json({
          data:userblogs
      });
    }
    catch(err)
    {
        res.json({
            Error:err.message
        });
    }
}