const express = require('express');

const router = express.Router();



const reviewController = require ('../Controllers/reviewControler');

const authenticate  = require('../Middleware/authenticate');



router.post('/create', authenticate, reviewController.createReview);
router.get('/product/:productId', authenticate, reviewController.getAllReviews);


module.exports = router;