const express = require('express');

const router = express.Router();



const orderController = require ('../Controllers/OrderControler');

const authenticate  = require('../Middleware/authenticate');



router.post('/create', authenticate, orderController.createOrder);
router.get('/user', authenticate, orderController.orderHistory);
router.get('/:id', authenticate, orderController.findOrderById);
router.get('/', orderController.getAllOrders);
router.delete('/:id', authenticate, orderController.deleteOrderById);

module.exports = router;