const mongoose = require('mongoose');
const { z } = require('zod');

const categorySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const Category = mongoose.model('Category', categorySchema);

const validateCategory = category => {
	const schema = z.object({
		title: z.string().trim().nonempty('Title is a required field.'),
		description: z.string().trim().nonempty('Description is a required field.'),
	});

	const validatonResult = schema.safeParse(category);

	if (!validatonResult.success) return validatonResult.error.issues.map(issue => issue.message);
};

module.exports = {
	Category,
	validateCategory,
};
