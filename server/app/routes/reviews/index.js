'use strict'

const router = require('express').Router();
const mongoose = require('mongoose');
const Reviews = mongoose.model('Reviews');
module.exports = router;

router.get('/', (req, res, next) => {
	Reviews.find({})
	.then(reviews => res.json(reviews))
	.catch(next);
});

router.post('/', (req, res, next) => {
	Reviews.create(req.body)
	.then(postedReview => res.json(postedReview))
	.catch(next);
});
