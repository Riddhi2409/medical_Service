const jwt=require('jsonwebtoken');
const Doctor = require('../models/doctorSchema')
const User = require('../models/UserSchema')
require('dotenv').config();

exports.authenticate = async(req,res,next)=>{
    console.log(req.body)
    const authToken=req.headers.authorization
    console.log(authToken)
    if(!authToken || !authToken.startsWith('Bearer')){
        return res.status(401).json({success: false,message: "No token authorization"});
    }
    try{
        console.log(authToken);
        const token=authToken.split(' ')[1];
        console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoded,"decoded")
        res.userId = decoded.id;
        next();
    }catch(err){
        console.log(err);
        if(err.name==='TokenExpiredError'){
            return res.status(401).json({message: "token is expired"});
        }
        return res.status(404).json({message: "invalid token"})
    
    }
}

exports.restrict = roles =>async(req,res,next)=>{
    const userId = req.userId;
    let user;
    const patient=await User.findById(userId);
    const doctor=await Doctor.findById(userId);

    if(patient){
        user=patient;
    }
    if(doctor){
        user=doctor;
    }
    if(!roles.includes(user.role)){
        return res.status(401).json({success: false, message: "you are not authorized"});
    }
    next()
}