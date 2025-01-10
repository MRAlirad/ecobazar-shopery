const error = (error, _, res, __) => {
	res.status(500).send([error.message]);
};

module.exports = error;
