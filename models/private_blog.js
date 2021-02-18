const mongoose=require('mongoose');
const blogschema=mongoose.Schema({
    Title:{
      type:String,
    },
    Description:{
        type:String,
      },
    Date:Date
});
module.exports=blogschema;