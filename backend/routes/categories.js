const validateObjectId = require('../middleware/validateObjectId');
const { Category, validateCategory } = require('../models/category');
const express = require('express');

const router = express.Router();

router.get('/', async (_, res) => {
	const categories = await Category.find().sort('title');
	res.send(categories);
});

router.get('/:id', validateObjectId, async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (!category) return res.status(404).send(['category with the given id was not found']);

	res.send(category);
});

router.post('/', async (req, res) => {
	// validate request
	const error = validateCategory(req.body);
	if (error) return res.status(400).send(error);

	let category = new Category(req.body);

	category = await category.save();

	res.send(category);
});

router.patch('/:id', validateObjectId, async (req, res) => {
	// validate request
	const error = validateCategory(req.body);
	if (error) return res.status(400).send(error);

	const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

	if (!category) return res.status(404).send(['category with the given id was not found']);

	res.send(category);
});

router.delete('/:id', validateObjectId, async (req, res) => {
	const category = await Category.findByIdAndDelete(req.params.id);

	if (!category) return res.status(404).send(['category with the given id was not found']);

	res.send(category);
});

module.exports = router;
