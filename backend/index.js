const express = require('express');
const connectDb = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const app = express();
const PORT = process.env.PORT || 4000 ;
app.use(express.json());
app.use('/user',userRoutes)
app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to the API"
    })
})
app.listen(PORT,async()=>{
    await connectDb();
    console.log(`App is Listening at ${PORT}`);
})