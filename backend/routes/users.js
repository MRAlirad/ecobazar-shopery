const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
});

router.post('/signup', async (req, res) => {
	// validate request
	const errors = validateUser(req.body);
	if (errors) return res.status(400).send(errors);

	let user = await User.findOne({ email: req.body.email });

	if (user) return res.status(400).send(['User already registered']);

	user = new User(req.body);

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();

	res.send({
		_id: user._id,
		name: user.name,
		email: user.email,
		token: token,
	});
});

module.exports = router;
