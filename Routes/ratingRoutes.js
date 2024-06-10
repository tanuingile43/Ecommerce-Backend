const express = require('express');

const router = express.Router();



const ratingController = require ('../Controllers/ratingControler');

const authenticate  = require('../Middleware/authenticate');



router.post('/create', authenticate, ratingController.createRating);
router.put('/product/:productId', authenticate, ratingController.getAllRatings);


module.exports = router;