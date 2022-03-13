const express = require('express');

const { signUpUser } = require('./../controllers/userControllers');



//**************** variables ****************//
const router = express.Router();


//**************** user routes ****************//
router.route('/signup').post(signUpUser);
/* router.route('/signin').post(authUser); */

module.exports = router;