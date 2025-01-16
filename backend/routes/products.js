const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const { Product, validateProduct } = require('../models/product');

const router = express.Router();

router.get('/', async (_, res) => {
	const products = await Product.find().populate('category').sort('title');
	res.send(products);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const product = await Product.findById(req.params.id).populate('category');
	if (!product) return res.status(404).send(['product with the given id was not found']);
	res.send(product);
});

router.post('/', auth, async (req, res) => {
	// validate request
	const error = validateProduct(req.body);
	if (error) return res.status(400).send(error);

	let product = new Product(req.body);

	product = await product.save();

	res.send(product);
});

router.patch('/:id', [auth, validateObjectId], async (req, res) => {
	// validate request
	const error = validateProduct(req.body);
	if (error) return res.status(400).send(error);

	const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

	if (!product) return res.status(404).send(['product with the given id was not found']);

	res.send(product);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
	const product = await Product.findByIdAndDelete(req.params.id);

	if (!product) return res.status(404).send(['product with the given id was not found']);

	res.send(product);
});

module.exports = router;
