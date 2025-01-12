require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/routes')(app);


// process.on('uncaughtException', ex => {
// 	winston.error(ex.message, ex);
// 	process.exit(1);
// });

// process.on('unhandledRejection', ex => {
// 	winston.error(ex.message, ex);
// 	process.exit(1);
// });

winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }));
winston.rejections.handle(new winston.transports.File({ filename: 'unhandledRejections.log' }));

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

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
