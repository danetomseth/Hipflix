'use strict'

const router = require('express').Router();
const mongoose = require('mongoose');
const Subscriptions = mongoose.model('Subscriptions');
module.exports = router;

router.get('/', (req, res, next) => {
	Subscriptions.find({})
	.then(subscriptions => res.send(subscriptions))
	.catch(next);
});

router.post('/', (req, res, next) => {
	Subscriptions.create(req.body)
	.then(createdSubscription => res.send(createdSubscription))
	.catch(next);
});
