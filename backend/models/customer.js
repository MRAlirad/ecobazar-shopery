const mongoose = require('mongoose');
const { z } = require('zod');

const customerSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	address: {
		type: String,
		required: true,
	},
});

const Customer = mongoose.model('Customer', customerSchema);

const validateCustomer = customer => {
	const schema = z.object({
		firstName: z.string().trim().nonempty('FirstName is a required field'),
		lastName: z.string().trim().nonempty('LastName is a required field'),
		email: z.string().trim().nonempty('Email is a required field'),
		phone: z.string().trim().nonempty('Phone is a required field'),
		address: z.string().trim().nonempty('Address is a required field'),
	});

	const validatonResult = schema.safeParse(customer);

	if (!validatonResult.success) return validatonResult.error.issues.map(issue => issue.message);
};

module.exports = {
	Customer,
	validateCustomer,
};
