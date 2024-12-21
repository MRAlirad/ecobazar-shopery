const express = require('express');
const Joi = require('joi');

const router = express.Router();

const products = [
	{
		id: 1,
		title: 'کلم بروکلی',
		price: 48,
		discount: 64,
		count: 10,
	},
	{
		id: 2,
		title: 'قارچ',
		price: 48,
		discount: 64,
		count: 10,
	},
	{
		id: 3,
		title: 'خیار',
		price: 48,
		discount: 64,
		count: 10,
	},
	{
		id: 4,
		title: 'گوجه فرنگی',
		price: 48,
		discount: 64,
		count: 10,
	},
	{
		id: 5,
		title: 'سیب زمینی',
		price: 48,
		discount: 64,
		count: 10,
	},
];

router.get('/', (_, res) => {
	res.send(products);
});

router.get('/:id', (req, res) => {
	// find the product
	const product = products.find(p => p.id === +req.params.id);
	if (!product)
		return res.status(404).send({
			status: false,
			message: 'product with the given id was not found',
		});

	res.send(product);
});

router.post('/', (req, res) => {
	// validate request
	const { error } = validateProduct(req.body);
	if (error) return res.status(400).send(error.details);

	const product = {
		id: products.length + 1,
		title: req.body.title,
		price: req.body.price,
		discount: req.body.discount || 0,
		count: req.body.count,
	};

	products.push(product);
	res.send(product);
});

router.patch('/:id', (req, res) => {
	// find the product
	let product = products.find(p => p.id === +req.params.id);
	if (!product)
		return res.status(404).send({
			status: false,
			message: 'product with the given id was not found',
		});

	// validate request
	const { error } = validateProduct(req.body);
	if (error) return res.status(400).send(error.details);

	product.title = req.body.title;
	product.price = req.body.price;
	product.discount = req.body.discount || 0;
	product.count = req.body.count;

	res.send(product);
});

router.delete('/:id', (req, res) => {
	// find the product
	const product = products.find(p => p.id === +req.params.id);
	if (!product)
		return res.status(404).send({
			status: false,
			message: 'product with the given id was not found',
		});

	// delete the product from the products array
	const index = products.indexOf(product);
	products.splice(index, 1);

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
