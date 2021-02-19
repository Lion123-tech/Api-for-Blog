const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
//api
const r1=require('./controller/API/create');
const r2=require('./controller/API/update');
const r3=require('./controller/API/getuser');
const r4=require('./controller/API/getsite');
const r5=require('./controller/API/delete');
const inc=require('./controller/API/likes');
const auth=require('./controller/API/authen');
//
require('dotenv').config();
const app=new express();
const port=process.env.PORT;
const Mongo_Url=process.env.MONGO_URL;
const Secret_key=process.env.SECRET_KEY;
//middleware
app.use(express.json());
app.use(bodyparser.urlencoded({
    extended: true
  }));
app.use(bodyparser.json());
app.use(session({
    secret: Secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: {  }
  }));

//connecting to database
mongoose.connect(Mongo_Url
    ,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology: true 
}).then(res=>console.log("Connected Succesfully !!"));


//listen to request
app.listen(port,()=>{
    console.log("Waiting for request at port "+port);
});

//handling request
app.get("/",(req,res,next)=>{
    res.send("Hello!!");
});
app.route("/register").post(auth.register);
app.route("/login").post(auth.login);
app.route("/logout").post(auth.logout);
app.route("/blogs").get(r3.getall).post(r1.create);
app.route("/blogs/:title/:posttype").delete(r5.delete);
app.route("/blogs/update").post(r2.updateblogs);
app.route("/home").get(r4.getall);
app.route("/likes/:title/:username").get(inc.likes);