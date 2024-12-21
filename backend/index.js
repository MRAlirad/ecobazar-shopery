const express = require('express');
const products = require('./routes/products');

const app = express();

app.use(express.json());
app.use('/api/products', products);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
