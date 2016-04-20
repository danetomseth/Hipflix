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

router.put('/', (req, res, next) => {
    console.log(req.user)
    // if(req.user.isAdmin || req.user === req.body.user){ // I think this will check if the current user is updating themselves, or is an admin
        var user = req.body.user
        User.findOne({email: user.email})
        .then(user => {
            user.subscription = req.body.sub._id
            console.log("****NEW USER****", user)
            return user.save()
        })
        .then(user => res.json(user))
        .catch(next)
    // }
})
