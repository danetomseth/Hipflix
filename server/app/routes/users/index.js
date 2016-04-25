'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Reviews = mongoose.model('Reviews');
const Orders = mongoose.model('Orders');
const Movies = mongoose.model('Movies');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const moment = require('moment');
// const renewalPeriod = require("../../../env").RENEWAL_PERIOD
const sendgrid = require('sendgrid')("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");

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

let sendEmail = function(email, subject, message){ // I think there's a promise version of this, but it's ok as is for now
    console.log("sending email")
    return sendgrid.send({
        to: email,
        from: 'hello@hipfix.win',
        subject: subject,
        text: message
    }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json)
      return json
  });
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
    let createdUser
    Users.findOne({email: req.body.email})
    .then((user) => {
      if(user) {
         let err = new Error('User already exists!');
         err.status = 403;
         return next(err);
     } else {
         return Users.create(req.body)
     }
 })
    .then(newUser => {
        createdUser = newUser
        return sendEmail(createdUser.email, "Welcome to hipflix", "You're signed up, "+createdUser.first)
    })
    .then(conf => {
        res.json(createdUser)
    })
    .catch(next);
});


router.post('/:userId/movie', (req, res, next) => {
	var allowance;
	if (req.newUser.subscription.allowance) {
		allowance = req.newUser.subscription.allowance;
	}
	else {
		allowance = 3;
	}
	req.newUser.movieQueue.addToQueue(req.body.movieId, allowance)
	.then(data => {
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
	res.json(req.newUser)
});

router.get('/:userId/moviequeue', (req, res, next) => {
	var movies = popMovies(req.newUser.movieQueue);
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

router.put('/subscription', (req, res, next) => {
    // if(req.user.isAdmin || req.user === req.body.user){ // I think this will check if the current user is updating themselves, or is an admin
        Users.findById(req.body.user._id)
        .then(user => {
            user.subscription = req.body.sub._id;
            user.renewalPrice = req.body.sub.price;
            user.renewalDate = moment().add(renewalPeriod, 'seconds') // this is a crappy business model - if someone updates their subscription mid-month, then they don't pay for the current pay period. We should add pro-rating logic.
            return user.save()
        })
        .then(user => res.json(user))
        .catch(next)
    // }
})

router.post('/:userId/contact', (req, res) =>{
    sendEmail(req.newUser.email, req.body.subject, req.body.message)
    .then(conf => res.sendStatus(201))
})
