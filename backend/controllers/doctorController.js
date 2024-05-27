const Doctor=require('../models/doctorSchema');
const Bookings=require('../models/BookingSchema');
const Review=require('../models/reviewSchema')

exports.updateUser = async(req,res)=>{
    const id=req.params.id;
    console.log(req.body);
    console.log(id,",,");
    try{
        const updatedUser = await Doctor.findByIdAndUpdate(id,{$set: req.body},{new: true});
        res.status(200).json({success: true,
            message: 'successfully updated',
            data: updatedUser,
        });
    }catch(err){
        res.status(500).json({success: false, message: "failed to update"});
    }
}
exports.deleteUser = async(req,res)=>{
    const id=req.params.id;
    try{
        const updatedUser = await Doctor.findByIdAndDelete(id);
        res.status(200).json({success: true,message: "deleted successfully"});
    }catch(err){
        res.status(500).json({success: false, message: "failed to delete"});
    }
}
exports.getSingleUser = async(req,res)=>{
    const id=req.params.id;
    try{
        const user = await Doctor.findById(id).populate('reviews').select(-'password')
        console.log(user,"user")
        res.status(200).json({success: true,
            message: 'user found',
            data: user,
        });
    }catch(err){
        console.log(err);
        res.status(404).json({success: false, message: "user not found"});
    }
}

exports.getAllUser = async(req,res)=>{
    try{
        const {query}=req.query
        // console.log(query)
        let users;
        if(query){
            users=await Doctor.find({isApproved:'approved',
                $or: [
                    {name: {$regex: query, $options: "i"}},
                    {specialization: {$regex: query, $options: "i"}},
                ] 
            }).select('-password')
        }else{

            users = await Doctor.find({isApproved: 'approved'}).select('-password');
        }
        console.log('users',users)
        res.status(200).json({success: true,
            message: 'users found',
            data: users,
        });
    }catch(err){ 
        res.status(404).json({success: false, message: "users not found"});
    }
}

exports.getDoctorProfile = async(req,res)=>{
    const userId= res.userId;
    console.log(userId);
    try{
        const user= await Doctor.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        console.log(user._doc);
        const {password,...rest}=user._doc;
        console.log(rest);
        const appointments= await Bookings.find({doctor: userId})
        res.status(200).json({success:true,message: 'profile info is getting',data: {...rest,appointments}})
    }catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
        }
}