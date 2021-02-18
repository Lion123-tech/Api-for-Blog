const mongoose=require('mongoose');
const user=require('./../../models/usermodel');
const identify=require('./../error/identify-error');
const session=require('express-session');

exports.register=async (req,res,next)=>{
    const password=req.body.password;
    const confirm_password=req.body.cpassword;
    console.log(req.body);
    //check if password and confirm password are same
    if(password !== confirm_password)
      res.send("Passwords are not same!!");
    else
    {
        const name=req.body.name;
        const username=req.body.username;
        const data=new user({
            Name:name,
            Username:username,
            Password:password,
            
        });
        
        try
        {
            const userdata=await user.create(data);
            req.session.Username=userdata.Username;
            res.send("Successfully Registered!!");
        }
        catch(err)
        {
            const errmsg=identify.register(err);
            res.status(500).json({
                message:"Fail",
                Error:errmsg,
                "Err":err
            });
        }
    }
}



exports.login=async (req,res,next)=>{
    if(req.body.username==""&&req.body.password=="")
           res.status(500).json({
               Status:"Fail",
               Msg:"Please enter username and password!!"});

    else if(req.body.username=="")
    res.status(500).json({
        Status:"Fail",
        Msg:"Please enter username"});

    else if(req.body.password=="")
    res.status(500).json({
        Status:"Fail",
        Msg:"Please enter password!!"});
    
    else{
        const username=req.body.username;
        const password=req.body.password;
        try
        {
            const userdata=await user.findOne({Username:username});
            if(userdata)
            {
                if(!(await userdata.passwordcheck(password,userdata.Password)))
                res.status(500).json({
                    Status:"Fail",
                    Msg:"Please enter correct password!!"});
                else
                {
                    req.session.Username=userdata.Username;
                    res.status(200).json({
                        status:"Success",
                        message:"Successfully-Signed-In"
                    });
                }
            }
            else
            {
                res.status(500).json({
                    Status:"Fail",
                    Message:"You are not registred!!"
                });
            }
        }
        catch(err)
        {
            res.status(500).json({
                status:"Fail",
                Error:err
            });
        }
    }
}