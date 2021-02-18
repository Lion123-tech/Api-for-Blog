const user=require('./../../models/usermodel');
exports.getall=async (req,res,next)=>{
    
    try
    {
      const userblogs=await user.aggregate([
       
        {$unwind: '$Publicblogs'},

        {$sort: { 'Publicblogs.Date': -1 }},
    {$project:{
        Publicblogs:1,
        Username:1,
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