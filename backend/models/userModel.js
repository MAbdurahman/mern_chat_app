const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema(
	{
		name: { type: 'String', required: true },
		email: { type: 'String', unique: true, required: true },
		password: { type: 'String', required: true },
		pic: {
			type: 'String',
			required: true,
			default:
				'https://res.cloudinary.com/mdbdrrhm/image/upload/v1635086610/people/default-user_dmmlom.png',
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{ timestamps: true }
);

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
