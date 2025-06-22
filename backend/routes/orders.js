const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const { Order, validateOrder } = require('../models/order');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.display === 'all') {
		const data = await Order.find().sort('-_id');
		res.send({ data });
	}

	const totalSize = 10;
	const currentPage = req.query.page ? +req.query.page : 1;
	const totalPages = Math.ceil((await Order.find().countDocuments()) / totalSize);

	const data = await Order.find()
		.skip((currentPage - 1) * totalSize)
		.limit(totalSize)
		.sort('-_id');
	res.send({ data, totalPages, currentPage });
});

router.post('/', auth, async (req, res) => {
	const error = validateOrder(req.body);
	if (error) return res.status(400).send(error);

	let order = new Order(req.body);

	order = await order.save();

	res.send(order);
});

module.exports = router;
