const User = require('../models/User')
const Profile = require('../models/Profile');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

// Send OTP

exports.sendOTP = async(req,res) =>{
    try {
        // Fetch Email From request ki Body
        const {email} = req.body;

        // Check If User Already Exits
        const checkUserPresent = await User.findOne({email});

        // If Already User Hein To Login Karne Bol
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User Already Registered!! Please Log In"
            })
        }

        // Generate OTP
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log("OTP Generated : ",otp);

        // Check If Generated OTP is Unique Or Not
        let result = await OTP.findOne({otp:otp});

        while(result){
            var otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"OTP Sent Successfuly",
            otp
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// SIGNUP Controller
exports.signUp = async(req,res) =>{
    try {
        const{
            firstName,
            lastName,
            password,
            confirmPassword,
            email,
            accountType,
            contactNumber,
            otp
        } = req.body;
    
        // Validate The Fields
        if(!firstName || !lastName || !password || !confirmPassword || !email || !otp ){
            return res.status(401).json({
                success:false,
                message:"All Fields Are Required"
            })
        }
    
        // Passwords MAtch Krlo
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password Did Not Match"
            });
        }
    
        // Check If User Already Exists
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"User Already Exists"
            });
        }
    
        // Find Most Recent OTP
        const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
        console.log( recentOtp);
    
        // Validate OTP
        if(recentOtp.length == 0){
            // OTP nahi h
            return res.status(400).json({
                success:false,
                message:"OTP Foundd"
            })
        }
        else if(otp !== recentOtp.otp){
            // Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
    
        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password,10);
    
        // Create Entry in DB
    
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
    
        const user = User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return res.status(200).json({
            success:true,
            message:"User has Registered Successfully",
            user
        })

    } catch (error) {
        console.log("SignUp mein Error : ", error.message);
        return res.status(401).json({
            success:false,
            message:"Error while Signing In"
        })
    }
}

// LOGIN Controller

exports.login = async(req,res) =>{
    try {
        // Fetch Data From req ki body
        const{email,password} = req.body;

        // Validate Data
        if(!email || !password){
            return res.status(201).json({
                success:false,
                message:"Enter All Fields"
            })
        }

        // Check Whether User Exists
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(200).json({
                success:true,
                message:"User Does Not Exist!! Please SignUp First"
            })
        }

        // Generate JWT TOken After Matching Passwords
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email : user.email,
                id: user._id,
                accountType : user.accountType               
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user.token = token ;
            user.password = undefined ;

            // Create Cookie

            const options ={
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Login Successfull"
            })
            
        }
        else{
            return res.status(200).json({
                success:false,
                message:"Incorrect Password"
            })
        }
    } catch (error) {
        console.log("Error While Logging In : ",error.message);
        return res.status(500).json({
            success:false,
            message:"Login Unsuccessfull !! Try Again Later"
        })
    }
};