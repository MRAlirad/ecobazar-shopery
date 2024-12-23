const mongoose = require('mongoose');
const Joi = require('joi');

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

const validateProduct = product => {
	const schema = Joi.object({
		title: Joi.string().required().min(3).max(255),
		price: Joi.number().required().min(0),
		discount: Joi.number().min(0).max(100),
		count: Joi.number().required().min(0),
	});

	return schema.validate(product);
};

module.exports = {
	Product,
	validateProduct,
};
