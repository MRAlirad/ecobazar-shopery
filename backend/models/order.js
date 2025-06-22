const mongoose = require('mongoose');
const { z } = require('zod');

const orderSchema = new mongoose.Schema({
	products: {
		type: Array,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: 'pending',
		enum: ['pending', 'sending', 'finish', 'cancel'],
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
		required: true,
	},
	description: {
		type: String,
	},
});

const Order = mongoose.model('Order', orderSchema);

const validateOrder = order => {
	const schema = z.object({
		products: z.array().nonempty('Add at least one product'),
		status: z.string().nonempty('Status is a required field.'),
		customer: z.string().nonempty('Customer is a required field'),
	});

	const validatonResult = schema.safeParse(order);

	if (!validatonResult.success) return validatonResult.error.issues.map(issue => issue.message);
};

module.exports = {
	Order: Order,
	validateOrder: validateOrder,
};
