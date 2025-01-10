const error = (error, _, res, _) => {
	res.status(500).send([error.message]);
};

module.exports = error;
