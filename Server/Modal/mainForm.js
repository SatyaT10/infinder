const mongoose=require('mongoose');



const mainSchema=new mongoose.Schema({
    businessEmail:{
        type:String,
        required:true
    },
    landingPageUrl:{
        type:String,
        required:true
    }
});


module.exports=mongoose.model('MainPage',mainSchema);
