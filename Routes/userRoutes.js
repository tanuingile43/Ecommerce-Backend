const express = require('express');

const router = express.Router();



const userController = require ('../Controllers/userControler');



router.get('/profile', userController.getUserProfile);
router.get('/all-users', userController.getAllUser);



module.exports = router;