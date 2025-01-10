const mongoose = require('mongoose');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
});

userSchema.methods.generateAuthToken = function(){
	const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
	return token;
}

const User = mongoose.model('User', userSchema);

const validateUser = user => {
	const schema = z.object({
		name: z.string().trim().nonempty('Name is a required field.').min(5, 'Name field must be at least 5 characters').max(50, 'Name must contain at most 50 characters'),
		email: z
			.string()
			.trim()
			.nonempty('Email is a required field.')
			.email('Email is not valid')
			.min(5, 'Email field must be at least 5 characters')
			.max(255, 'Email must contain at most 255 characters'),
		password: z.string().trim().nonempty('Password is a required field.').min(5, 'Password field must be at least 5 characters').max(1024, 'Password must contain at most 1024 characters'),
	});

	const validatonResult = schema.safeParse(user);

	if (!validatonResult.success) return validatonResult.error.issues.map(issue => issue.message);
};

module.exports = {
	User,
	validateUser,
};
