const { Product, validateProduct } = require('../models/product.js');
const express = require('express');

const router = express.Router();

router.get('/', async (_, res) => {
	const products = await Product.find().sort('name');
	res.send(products);
});

router.get('/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (!product)
		return res.status(404).send({
			status: false,
			message: 'product with the given id was not found',
		});

	res.send(product);
});

router.post('/', async (req, res) => {
	// validate request
	// const { error } = validateProduct(req.body);
	// if (error)
	// 	return res.status(400).send({
	// 		status: false,
	// 		errors: (() => error.details.map(detail => detail.message))(),
	// 	});
	// return;

	let product = new Product({
		title: req.body.title,
		price: req.body.price,
		discount: req.body.discount || 0,
		count: req.body.count,
	});

	product = await product.save();
	res.send(product);
});

router.patch('/:id', async (req, res) => {
	// validate request
	const { error } = validateProduct(req.body);
	if (error) return res.status(400).send(error.details);

	const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

	if (!product)
		return res.status(404).send({
			status: false,
			message: 'product with the given id was not found',
		});

	res.send(product);
});

router.delete('/:id', async (req, res) => {
	const product = await Product.findByIdAndDelete(req.params.id);

	if (!product)
		return res.status(404).send({
			status: false,
			message: 'product with the given id was not found',
		});

	res.send(product);
});

module.exports = router;
