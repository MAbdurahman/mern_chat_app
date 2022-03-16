const User = require('./../models/userModel');
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary');
const generateToken = require('./../utils/generateToken');

/*======================================================
         Sign-Up User (POST) -> /api/v1/user/signup
=========================================================*/
const signUpUser = asyncHandler(async (req, res) => {
	const { name, email, password, pic } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Enter a value in all fields!');
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('Email already exists!');
	}

	const user = await User.create({
		name,
		email,
		password,
		pic
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('User Creation Unsuccessful!');
	}
});

/*=========================================================
         Sign-In User (POST) -> /api/v1/user/signin
============================================================*/
const signInUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//***** check if email and password is entered by user ******//
	if (!email || !password) {
		throw new Error('Please enter email and password!', 400);
	}

	//**************** finding user in database ****************//
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw new Error('Invalid email or password!', 401);
	}

	//**************** check if password is correct ****************//
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			pic: user.pic,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid Email or Password!', 401);
	}
});

module.exports = { signUpUser, signInUser };
