require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const products = require('./routes/products');
const categories = require('./routes/categories');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth = require('./routes/auth');
const cors = require('cors');
const error = require('./middleware/error');

const app = express();

process.on('uncaughtException', ex => {
	winston.error(error.message, error);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/shopery' }));

if (!config.get('jwtPrivateKey')) {
	console.error('FATAL ERROR: jwtPrivateKey is not defined.');
	process.exit(1);
}

mongoose
	.connect('mongodb://localhost/shopery')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(cors());
app.use('/api/products', products);
app.use('/api/categories', categories);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/customers', customers);

app.use(error);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
