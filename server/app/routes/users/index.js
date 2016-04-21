'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Reviews = mongoose.model('Reviews');
const Orders = mongoose.model('Orders');
const Movies = mongoose.model('Movies');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

module.exports = router;

var popMovies = function(queue) {
	var userMovies = [];
	queue.queue.forEach(function(elem) {
		Movies.findById(elem.movie)
		.then(function(movie) {
			userMovies.push(movie)
		})
	})
	return userMovies 
}

router.param('userId', (req, res, next, userId) => {
	Users.findById(userId)
		.deepPopulate('addresses addresses.user movieQueue movieQueue.queue.movie movieQueue.queue subscription billingHistory billingHistory.user')
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
router.get('/', (req, res, next) => {
	Users.find({})
		.then(users => res.json(users))
		.catch(next);
});

router.post('/', (req, res, next) => {
	Users.findOne({email: req.body.email})
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

router.post('/:userId/movie', (req, res, next) => {
	req.newUser.movieQueue.addToQueue(req.body.movieId)
	.then(data => {
		console.log('data returned', data);
		res.status(204).send('created')
	})
	.catch(next)
})

router.delete('/:userId/movie/:itemId', (req, res, next) => {
	req.newUser.movieQueue.dequeue(req.params.itemId)
	.then(data => {
			res.status(204).send('deleted')
		})
		.catch(next)
})

router.get('/:userId', (req, res, next) => {
	console.log('user!');
	res.json(req.newUser)
});

router.get('/:userId/moviequeue', (req, res, next) => {
	console.log('user route');
	var movies = popMovies(req.newUser.movieQueue);
	console.log('movies', movies);
	res.json(req.newUser);
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