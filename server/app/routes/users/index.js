'use strict';

const router = require('express').Router();
const Users = require('../db/models/users.js');
const Reviews = require('../db/models/reviews.js');
module.exports = router;

router.get('/', (req, res, next) => {
	Users.find({})
		.then(users => res.json(users))
		.catch(next);
});

router.post('/', (req, res, next) => {
	Users.findOrCreate(req.body)
		.then(newUser => res.json(newUser))
		.catch(next);
});

router.params('/:userId', (req, res, next, id) => {
	Users.findById(id)
		.populate('movieQueue')
		.then(user => {
			if(!user) {
				res.sendStatus(404);
			} else {
				req.user = user;
				next();
			}
		})
		.catch(next);

});

router.get('/:userId', (req, res, next) => {
	res.json(req.user)
});

router.get('/:userId/moviequeue', (req, res, next) => {
	res.json(req.user.movieQueue);
});

router.get('/:userId/reviews', (req, res, next) => {
	Reviews.find({user: req.user._id})
		.then(reviewsOfOneUser => res.json(reviewsOfOneUser))
		.catch(next);
});