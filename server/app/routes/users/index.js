'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Reviews = mongoose.model('Reviews');
const Orders = mongoose.model('Orders');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = router;

router.get('/', (req, res, next) => {
	Users.find({})
		.then(users => res.json(users))
		.catch(next);
});

router.post('/', (req, res, next) => {
	Users.find(req.body)
	.then((user) => {
		if(user) {
			let err = new Error('User already exists!');
			err.status = 403;
			return next(err);
		} else {
			return Users.create(req.body)
			.then(newUser => res.json(newUser));
		}
	})
	.catch(next);	
});

router.param('/:userId', (req, res, next, userId) => {
	Users.findById(userId)
		.deepPopulate('addresses addresses.user movieQueue movieQueue.movie subscription billingHistory billingHistory.user')
		.then(user => {
			if(!user) {
				res.sendStatus(404);
			} else {
				req.newUser = user;
				next();
			}
		})
		.catch(next);

});

router.get('/:userId', (req, res, next) => {
	res.json(req.newUser)
});

router.get('/:userId/moviequeue', (req, res, next) => {
	res.json(req.newUser.movieQueue);
});

router.get('/:userId/reviews', (req, res, next) => {
	Reviews.find({user: req.newUser._id})
		.then(reviewsOfOneUser => res.json(reviewsOfOneUser))
		.catch(next);
});

router.get('/:userId/billing', (req, res, next) => {
	res.json(req.newUser.billingHistory)
});

router.get('/:userId/orders', (req, res, next) => {
	Orders.find({user: req.newUser._id})
		.then(ordersOfOneUser => res.json(ordersOfOneUser))
		.catch(next);
});