const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt')

exports.resetPasswordToken = async(req,res) =>{
    try {
        // Fetch Email
        const email = req.body.email;

        // Check if user Exists
        const user = await User.findOne({email:email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Regisetred"
            })
        }

        // Generate Token
        const token = crypto.randomUUID();

        // Update User by adding token and expiration time to it
        const updatedUser = await User.findOneAndUpdate({email:email},
                                                        {
                                                        token:token,
                                                        resetPasswordExpires : Date.now() + 5*60*1000
                                                        },
                                                        {new:true});

        // Create URL
        const url = `https://localhost:3000/update-password/${token}`;

        // Send Mail
        await mailSender(email , 
                        "Email for Password Reset",
                        `Password Reset Link : ${url}`);

        return res.status(200).json({
            success:true,
            message:"Email Sent SuccessFully!! Please Check"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Reset Password Mail Not Sent"
        })
    }
}



// Reset Password
exports.reserPassword = async(req,res) =>{
    try {
        // Fetch Details from req ki body
        const {password , confirmPassword , token} = req.body ;

        // validate
        if(password !== confirmPassword){
            return res.status(500).json({
                success:false,
                message:"Password did not match"
            })
        }

        // Check Token (If valid get user Details)
        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.json({
                success:false,
                message:"Token Is Invalid"
            })
        }

        // Checking Token Expiration
        if( userDetails.resetPasswordExpires < Date.name()){
            return res.json({
                success:false,
                message:"Token Is Expired !! Generate New Token"
            })
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password,10);

        // Update The Password In User
        await User.findOneAndUpdate(
            { token : token },
            { password : hashedPassword },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Password Reset Successful"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Password Was NOt Updated"
        })
    }
}