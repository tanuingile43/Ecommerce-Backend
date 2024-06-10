const express = require('express');

const router = express.Router();



const productController = require ('../Controllers/productControler');

const authenticate  = require('../Middleware/authenticate');



router.get('/', authenticate, productController.getAllProducts);
router.get('/id/:id', authenticate, productController.findProductById);


module.exports = router;