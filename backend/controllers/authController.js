const Booking=require('../models/BookingSchema')

const User = require('../models/UserSchema');
const Doctor = require('../models/doctorSchema');
const jwt= require('jsonwebtoken');
const bcryptjs=require('bcryptjs');
require('dotenv').config();

const generateToken = user => {
    return jwt.sign({id: user._id,role:user.role},process.env.JWT_SECRET_KEY,{
        expiresIn: '15d'
    })
}

exports.register = async(req,res)=>{
    const {email,password,name,role,photo,gender}=req.body;
    try{
        let user=null;
        if(role==='patient'){
            user=await User.findOne({email});

        }
        else if(role==='doctor'){
            user= await Doctor.findOne({email});
        }
        if( user){
            return res.status(400).json({message:"user already presen"});
        }


        const salt=await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);

        console.log(req.body);
        
        if(role==='patient'){
            // co
            user= await User.create({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }
        if(role==='doctor'){
            user= await Doctor.create({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            })
        }



        // await user.save();

        return res.status(200).json({success: true, message: 'user successfully created'})
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "internal Server error"})
    }
}

exports.login = async(req,res)=>{
    try{
        const {email}=req.body;
        console.log(req.body);
        let user=null;
        const patient=await User.findOne({email});
        const doctor=await Doctor.findOne({email});
        
        if( patient){
            user=patient;
        }

        if(doctor){
            user = doctor;
        }
        if( !user){
            return res.status(404).json({message:"user not found"});
        }
        const isPasswordMatch = await bcryptjs.compare(req.body.password,user.password);

        if(!isPasswordMatch){
            return res.status(400).json({status: false, message: "invalid password"})
        }
        const token = generateToken(user);
        const {password,role,appointments,...rest}=user._doc
        res.status(200).json({status: true,token,data:{...rest},role,message: "login successfull"});

        
    }catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "internal Server error"})
    }
}

