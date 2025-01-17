const { User } = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');

const router = express.Router();

router.post('/login', async (req, res) => {
	// validate request
	const errors = validateUser(req.body);
	if (errors) return res.status(400).send(errors);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send(['Invalid email or password.']);

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send(['Invalid email or password.']);

	const token = user.generateAuthToken();

	res.send({
		_id: user._id,
		name: user.name,
		email: user.email,
		token: token,
	});
});

const validateUser = req => {
	const schema = z.object({
		email: z
			.string()
			.trim()
			.nonempty('Email is a required field.')
			.email('Email is not valid')
			.min(5, 'Email field must be at least 5 characters')
			.max(255, 'Email must contain at most 255 characters'),
		password: z.string().trim().nonempty('Password is a required field.').min(5, 'Password field must be at least 5 characters').max(1024, 'Password must contain at most 1024 characters'),
	});

	const validatonResult = schema.safeParse(req);

	if (!validatonResult.success) return validatonResult.error.issues.map(issue => issue.message);
};

module.exports = router;
