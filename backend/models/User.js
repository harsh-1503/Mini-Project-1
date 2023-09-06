const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["Visitor","Farmer","Customer"],
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true
    },
    city:{
        type:String,
        trim:true,
    },
    district:{
        type:String,
        trim:true
    },
    age:{
        type:Number,
    },
    document:[{
        type : String ,
        trim:true
    }]

    
})

module.exports = mongoose.model("User",userSchema);