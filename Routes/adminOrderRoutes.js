const express = require('express');

const router = express.Router();


// Import Order Controller
const orderController = require ('../Controllers/adminOrderControler');

// Import Authentication Middleware
const authenticate  = require('../Middleware/authenticate');



router.get('/', authenticate, orderController.getAllOrders);
router.put('/:orderId/confirmed',authenticate,orderController.confirmedOrders);
router.put('/:orderId/ship',authenticate,orderController.shippOrders);
router.put('/:orderId/deliver',authenticate,orderController.deliverOrders);
router.put('/:orderId/cancel',authenticate,orderController.cancelOrders);
router.put('/:orderId/delete',authenticate,orderController.deleteOrders);

module.exports = router;