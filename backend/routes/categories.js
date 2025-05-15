const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const { Category, validateCategory } = require('../models/category');

const router = express.Router();

router.get('/', async (req, res) => {
	if (req.query.display === 'all') {
		const data = await Category.find().sort('-_id');
		res.send({ data, totalPages: 1, currentPage: 1 });
	}

	const totalSize = 1;
	const currentPage = req.query.page ? +req.query.page : 1;
	const totalPages = Math.ceil((await Category.find().countDocuments()) / totalSize);

	const data = await Category.find()
		.skip((currentPage - 1) * totalSize)
		.limit(totalSize)
		.sort('-_id');
	res.send({ data, totalPages, currentPage });
});

router.get('/:id', validateObjectId, async (req, res) => {
	const category = await Category.findById(req.params.id);

	if (!category) return res.status(404).send(['category with the given id was not found']);

	res.send(category);
});

router.post('/', auth, async (req, res) => {
	// validate request
	const error = validateCategory(req.body);
	if (error) return res.status(400).send(error);

	let category = new Category(req.body);

	category = await category.save();

	res.send(category);
});

router.patch('/:id', [auth, validateObjectId], async (req, res) => {
	// validate request
	const error = validateCategory(req.body);
	if (error) return res.status(400).send(error);

	const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

	if (!category) return res.status(404).send(['category with the given id was not found']);

	res.send(category);
});

router.delete('/:id', [auth, validateObjectId], async (req, res) => {
	const category = await Category.findByIdAndDelete(req.params.id);

	if (!category) return res.status(404).send(['category with the given id was not found']);

	res.send(category);
});

module.exports = router;
