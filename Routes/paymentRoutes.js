const express = require('express');
const router = express.Router();
const authenticate = require('../Middleware/authenticate')

const paymentController = require('../Controllers/paymentControler');




router.post('/:id',authenticate,paymentController.createPaymentLink);
router.get('/',authenticate,paymentController.updatePaymentInformation);


module.exports = router;