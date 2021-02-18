exports.check1=async (title,username,user)=>{
  try{
      const userdata=await user.findOne({Username:username,"Publicblogs.Title":title});
      if(userdata)
       return false;
    else
      return true;
  }
  catch(err){
      console.log(err);
      return false;
  }
}

exports.check2=async (title,username,user)=>{
  try{
      const userdata=await user.findOne({Username:username,"Privateblogs.Title":title});
      if(userdata)
       return false;
    else
      return true;
  }
  catch(err){
      console.log(err);
      return false;
  }
}