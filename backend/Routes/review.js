const express= require('express');

const {getAllReview,createReview}=require('../controllers/reviewController');
const { authenticate } = require('../auth/verifyToken');

const router=express.Router({mergeParams: true});

router.route('/').get(getAllReview).post(authenticate,createReview);


module.exports=router;