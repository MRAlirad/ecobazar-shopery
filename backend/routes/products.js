const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');

const router = express.Router();

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 255,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	discount: {
		type: Number,
		min: 0,
		max: 100,
	},
	count: {
		type: Number,
		required: true,
		min: 0,
	},
});

const Product = mongoose.model('Product', productSchema);

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
	const { error } = validateProduct(req.body);
	if (error) return res.status(400).send(error.details);

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

const validateProduct = product => {
	const schema = Joi.object({
		title: Joi.string().required('find sth'),
		price: Joi.number().required().min(0),
		discount: Joi.number().min(0).max(100),
		count: Joi.number().required().min(0),
	});

	return schema.validate(product);
};

module.exports = router;
