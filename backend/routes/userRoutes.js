//**************** imports ****************//
const express = require('express');
const { protected } = require('./../middlewares/authMiddleware');
const {
	signUpUser,
	signInUser,
	getAllUsers,
} = require('./../controllers/userControllers');

//**************** variables ****************//
const router = express.Router();

//**************** user routes ****************//
router.route('/').get(protected, getAllUsers);
router.route('/sign-up').post(signUpUser);
router.route('/sign-in').post(signInUser);

module.exports = router;
