const mongoose=require('mongoose');
const blogschema=mongoose.Schema({
    Title:{
      type:String,
    },
    Site:{
      type:String,
    },
    Description:{
      type:String,
    },
    Likes:Number,
    Date:Date
});
module.exports=blogschema;