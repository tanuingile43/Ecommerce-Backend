const express = require('express');

const router = express.Router();



const cartItemController = require ('../Controllers/cartItemControler');

const authenticate  = require('../Middleware/authenticate');



router.put('/:id', authenticate, cartItemController.updateCartItem);
router.delete("/:id", authenticate, cartItemController.removeCartItem)

module.exports = router;