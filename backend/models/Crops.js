const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"  //Reference To User Model
    },
    Type:{
        type:String,
        trim:true
    },
    Quantity:{
        type:Number
    },
    Price:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Center",centerSchema);