'use strict'

const router = require('express').Router();
const mongoose = require('mongoose');
const Subscriptions = mongoose.model('Subscriptions');
const User = mongoose.model('Users');
module.exports = router;

router.get('/', (req, res, next) => {
	Subscriptions.find({})
	.then(subscriptions => res.json(subscriptions))
	.catch(next);
});

router.post('/', (req, res, next) => {
	Subscriptions.create(req.body)
	.then(createdSubscription => res.json(createdSubscription))
	.catch(next);
});

// router.get('/basic', (req, res, next) => {
//     console.log('basic route')
//     Subscriptions.find({plan:'Basic'})
//     .then(subscription => res.json(subscription))
//     .catch(next);
// });


