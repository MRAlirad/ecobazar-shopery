const { Customer, validateCustomer } = require('../models/customer');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.display === 'all') {
		const data = await Customer.find().sort('-_id');
		res.send({ data });
	}

	const totalSize = 10;
	const currentPage = req.query.page ? +req.query.page : 1;
	const totalPages = Math.ceil((await Customer.find().countDocuments()) / totalSize);

	const data = await Customer.find()
		.skip((currentPage - 1) * totalSize)
		.limit(totalSize)
		.sort('-_id');
	res.send({ data, totalPages, currentPage });
});

// router.get('/:id', async (req, res) => {
// 	const customer = await Customer.findById(req.params.id);

// 	if (!customer)
// 		return res.status(404).send({
// 			status: false,
// 			message: 'customer with the given id was not found',
// 		});

// 	res.send(customer);
// });

// router.post('/', async (req, res) => {
// 	// validate request
// 	const { error } = validateCustomer(req.body);
// 	if (error) return res.status(400).send(error.details);

// 	let customer = new Customer({
// 		name: req.body.name,
// 		phone: req.body.phone,
// 		isGold: req.body.isGold,
// 	});

// 	customer = await customer.save();
// 	res.send(customer);
// });

// router.patch('/:id', async (req, res) => {
// 	// validate request
// 	const { error } = validateCustomer(req.body);
// 	if (error) return res.status(400).send(error.details);

// 	const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });

// 	if (!customer)
// 		return res.status(404).send({
// 			status: false,
// 			message: 'product with the given id was not found',
// 		});

// 	res.send(customer);
// });

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
	const customer = await Customer.findByIdAndDelete(req.params.id);

	if (!customer) return res.status(404).send(['customer with the given id was not found']);

	res.send(customer);
});

module.exports = router;
