const express = require('express');

const { signUpUser, signInUser, getAllUsers } = require('./../controllers/userControllers');
const { protected } = require('./../middlewares/authMiddleware');



//**************** variables ****************//
const router = express.Router();


//**************** user routes ****************//
router.route('/').get(protected, getAllUsers);
router.route('/signup').post(signUpUser);
router.route('/signin').post(signInUser); 

module.exports = router;