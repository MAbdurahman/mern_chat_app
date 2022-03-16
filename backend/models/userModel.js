//**************** imports ****************//
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//**************** variables ****************//
const name_pattern =
	/^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/i;
const email_pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const userModel = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'First and last name are required!'],
		minlength: [4, 'Name must be at least 4 characters!'],
		maxLength: [32, 'Name cannot exceed 32 characters!'],
		match: [name_pattern, 'Enter first and last name!'],
	},
	email: {
		type: String,
		trim: true,
		required: [true, 'Email is required!'],
		unique: true,
		match: [email_pattern, 'Enter a valid email address!'],
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'Please enter your password!'],
		minlength: [8, 'Password must be at least 8 characters!'],
		select: false,
	},
	pic: {
		type: String,
		require: true,
		default:
			'https://res.cloudinary.com/mdbdrrhm/image/upload/v1635086610/people/default-user_dmmlom.png',
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	creatAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

userModel.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre('save', async function (next) {
	if (!this.isModified) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userModel);
