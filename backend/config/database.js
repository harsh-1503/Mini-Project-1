const mongoose = require('mongoose');
require("dotenv").config();

const connectDb = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("DataBase Connecte Successfully"))
    .catch((err)=>{
        console.log("Error in DB Connectivity");
        console.error(err);
        process.exit(1);
    })
}

module.exports = connectDb ; 