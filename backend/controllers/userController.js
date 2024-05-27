const User=require('../models/UserSchema');
const Booking=require('../models/BookingSchema');
const Doctor=require('../models/doctorSchema')
exports.updateUser = async(req,res)=>{
    const id=req.params.id;
    console.log(res.userId,"nnn")
    try{
        const updatedUser = await User.findByIdAndUpdate(id,{$set: req.body},{new: true});
        console.log(updatedUser)
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
        const updatedUser = await User.findByIdAndDelete(id);
        res.status(200).json({success: true,message: "deleted successfully"});
    }catch(err){
        res.status(500).json({success: false, message: "failed to delete"});
    }
}
exports.getSingleUser = async(req,res)=>{
    const id=req.params.id;
    try{
        const user = await User.findById(id).select('-password');
        
        res.status(200).json({success: true,
            message: 'user found',
            data: user,
        });
    }catch(err){
        res.status(404).json({success: false, message: "user not found"});
    }
}

exports.getAllUser = async(req,res)=>{
    try{
        const users = await User.find({}).select('-password');
        res.status(200).json({success: true,
            message: 'users found',
            data: users,
        });
    }catch(err){
        res.status(404).json({success: false, message: "users not found"});
    }
}

exports.getMyAppointments= async (req, res) =>{
    console.log(res.userId,"aap")

    try {
    // step-1: retrieve appointments from booking for specific user const bookings await Booking.find({user: req.userId });
    const bookings = await Booking.find({user: res.userId })
    // step-2: extract doctor ids from appointment bookings
    
    const doctorIds= bookings.map(el => el.doctor.id);
    
    // step 3 retrieve doctors using doctor ids
    
    const doctors= await Doctor.find({ _id: { $in: doctorIds } }).select("-password");
    
    res.status(200).json({
        success: true,
        message: "Appointments are getting",
        data:doctors
    
    });
    }catch (err) {
        console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
    }
}

exports.getUserProfile = async(req,res)=>{
    console.log(req.body,"op");
    const userId= res.userId;
    console.log(userId);
    try{
        const user= await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        const {password,...rest}=user._doc;
        res.status(200).json({success:true,message: 'profile info is getting',data: {...rest}})
    }catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
        }
}