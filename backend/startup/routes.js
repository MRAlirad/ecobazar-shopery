const express = require('express');
const products = require('../routes/products');
const categories = require('../routes/categories');
const customers = require('../routes/customers');
const users = require('../routes/users');
const auth = require('../routes/auth');
const cors = require('cors');
const error = require('../middleware/error');

module.exports = function (app) {
	app.use(express.json());
	app.use(cors());
	app.use('/api/products', products);
	app.use('/api/categories', categories);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	app.use('/api/customers', customers);

	app.use(error);
};
