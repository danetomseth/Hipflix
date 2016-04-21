'use strict'

const router = require('express').Router();
const mongoose = require('mongoose');
const Reviews = mongoose.model('Reviews');
const Movies = mongoose.model('Movies');
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
	console.log('req.body', req.body)
	var newReview;
	Reviews.create(req.body)
	.then(postedReview => {
		newReview = postedReview;
		return Movies.findById(postedReview.movie)
	})
	.then(matchedMovie => {
		matchedMovie.reviews.push(newReview._id);
		return matchedMovie.save();
	})
	.then((reviewedMovie) => res.json(reviewedMovie))
	.catch(next);
});
