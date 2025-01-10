const winston = require('winston');
const error = (error, _, res, __) => {
	winston.error(error.message, error);
	res.status(500).send([error.message]);
};

module.exports = error;
