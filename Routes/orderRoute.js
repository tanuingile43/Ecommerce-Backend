const express = require('express');

const router = express.Router();



const orderController = require ('../Controllers/OrderControler');

const authenticate  = require('../Middleware/authenticate');



router.post('/', authenticate, orderController.createOrder);
router.get('/user', authenticate, orderController.orderHistory);
router.get('/:id', authenticate, orderController.findOrderById);



module.exports = router;