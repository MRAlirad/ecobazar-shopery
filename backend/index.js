const mongoose = require('mongoose');
const express = require('express');
const products = require('./routes/products');
const customers = require('./routes/customers');

const app = express();

mongoose.connect('mongodb://localhost/shopery')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...'))
;

app.use(express.json());
app.use('/api/products', products);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
