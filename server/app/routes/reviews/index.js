'use strict'

const router = require('express').Router();
const mongoose = require('mongoose');
const Reviews = mongoose.model('Reviews');
module.exports = router;

// we are probably not using /Reviews page right now (stretch feature), unless
// we have time to build a Recommendations page/ engine that highlights reviews/
// movies that might interest a particular User.

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
