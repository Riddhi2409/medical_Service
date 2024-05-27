const express =require('express');

const {getAllUser,updateUser,deleteUser,getSingleUser,getMyAppointments,getUserProfile}=require('../controllers/userController')

const router=express.Router();

const {authenticate} =require('../auth/verifyToken')

router.get('/:id',authenticate,getSingleUser)
router.get('/',authenticate,getAllUser)
router.put('/:id',authenticate,updateUser)
router.get('/:id',authenticate,deleteUser);
router.get('/profile/me',authenticate,getUserProfile);
router.get('/appointments/my-appointments',authenticate,getMyAppointments);

module.exports=router;