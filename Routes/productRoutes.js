const express = require('express');

const router = express.Router();



const productController = require ('../Controllers/productControler');

const authenticate  = require('../Middleware/authenticate');



router.get('/', productController.getAllProducts);
router.get('/id/:id',  productController.findProductById);


module.exports = router;