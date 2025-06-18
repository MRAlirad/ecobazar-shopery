const mongoose = require('mongoose');
const { z } = require('zod');

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: {
		type: [String],
		required: true,
	},
	attributes: {
		type: [{ label: String, value: String }],
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
	status: {
		type: Number,
		required: true,
		enum: [1, 2, 3], // 1: active, 2: inactive, 3: archived
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
});

const Product = mongoose.model('Product', productSchema);

const validateProduct = product => {
	// console.log(product);
	const schema = z.object({
		title: z.string().trim().nonempty('Title is a required field.'),
		description: z.string().trim().nonempty('Description is a required field.'),
		images: z.array(z.string()).nonempty('Choose at least one image.'),
		price: z.number().gte(0, 'Price must be grater than 0'),
		discount: z.number().gte(0, 'Discount must be greater than or equal to 0').lte(100, 'Discount must be less than or equal to 100'),
		count: z.number().gte(0, 'Count must be grater than or equal to 0'),
		status: z.number().gte(1).lte(3),
		category: z.string().nonempty('Category is a required field.'),
	});

	const validatonResult = schema.safeParse(product);

	if (!validatonResult.success) return validatonResult.error.issues.map(issue => issue.message);
};

module.exports = {
	Product,
	validateProduct,
};
