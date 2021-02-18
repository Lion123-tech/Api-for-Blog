exports.check1=async (title,username,user)=>{
    console.log(username);
    try{
        const userdata=await user.findOne({Username:username});
        let count=0;
            userdata.Publicblogs.forEach(element => {
                if(element.Title==title)
                  count+=1;
            });
       console.log(count);
      if(count>0)
       return false;
      else
       return true;

    }
    catch(err){
        console.log("error"+err.message);
        return false;
    }
}

exports.check2=async (title,username,user)=>{
    console.log(username);
    try{
        const userdata=await user.findOne({Username:username});
        let count=0;
            userdata.Privateblogs.forEach(element => {
                if(element.Title==title)
                  count+=1;
            });
       console.log(count);
      if(count>0)
       return false;
      else
       return true;

    }
    catch(err){
        console.log("error"+err.message);
        return false;
    }
}