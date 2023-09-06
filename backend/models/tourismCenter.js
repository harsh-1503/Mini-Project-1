const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"  //Reference To User Model
    },
    location:{
        type:String,
        trim:true
    },
    address:{
        type:String
    },
    Activities:[{
        type : String
    }]
})

module.exports = mongoose.model("Center",centerSchema);