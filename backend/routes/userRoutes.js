const express = require('express');

const { signUpUser, signInUser } = require('./../controllers/userControllers');



//**************** variables ****************//
const router = express.Router();


//**************** user routes ****************//
router.route('/signup').post(signUpUser);
router.route('/signin').post(signInUser); 

module.exports = router;