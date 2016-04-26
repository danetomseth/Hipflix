'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	if (process.env.NODE_ENV === 'production') {
		res.status(201).send(true);
	} else {
		res.status(201).send(false);
	}
});

module.exports = router;