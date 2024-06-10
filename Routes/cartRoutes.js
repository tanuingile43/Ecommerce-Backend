const express = require('express');

const router = express.Router();



const cartController = require ('../Controllers/cartControler');
const authenticate  = require('../Middleware/authenticate');



router.get('/', authenticate, cartController.findUserCart);
router.put('/add', authenticate, cartController.addItemToCart);

module.exports = router;