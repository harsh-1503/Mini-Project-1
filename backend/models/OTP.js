const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    },
    
});

// A Function To Send Mail
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"Verification Mail from Madhusudan" , otp);
        console.log("OTP MAil Sent Successfuly : ",mailResponse);
    } catch (error) {
        console.log(`Error While Sending OTP :`, error.message);
        throw error;
    }
}

OTPSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);