const express =require('express');

const {getAllUser,updateUser,deleteUser,getSingleUser,getDoctorProfile}=require('../controllers/doctorController')
const {authenticate} = require('../auth/verifyToken')
const reviewRouter=require('./review');

const router=express.Router();

//nested route
router.use('/:doctorId/reviews',reviewRouter);

router.get('/:id',getSingleUser)
router.get('/',getAllUser)
router.put('/:id',authenticate,updateUser)
router.get('/:id',deleteUser);
router.get('/profile/me',authenticate,getDoctorProfile)

module.exports=router;