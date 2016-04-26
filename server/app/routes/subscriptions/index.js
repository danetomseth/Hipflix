'use strict'

const router = require('express').Router();
const mongoose = require('mongoose');
const Subscriptions = mongoose.model('Subscriptions');
const User = mongoose.model('Users');
const KEY = require("../../../env").PAYMENT_KEY;
const stripe = require("stripe")(KEY);
module.exports = router;

router.get('/', (req, res, next) => {
	Subscriptions.find({})
	.then(subscriptions => res.json(subscriptions))
	.catch(next);
});

router.get('/:id', (req, res, next) => {
    Subscriptions.findOne({
        _id: req.params.id
    })
    .then(subscriptions => res.json(subscriptions))
    .catch(next);
});

router.post('/', (req, res, next) => {
    var sub = req.body
    stripe.plans.create({
        amount: (sub.price)*100,
        interval: "month",
        name: sub.plan,
        currency: "usd",
        id: sub.plan,
        statement_descriptor: "VHSs are so hip"
    })
    .then(plan => {
        //save it to our DB
        console.log(plan)
        return Subscriptions.create(req.body)
    })
    .then(createdSubscription => res.json(createdSubscription))
    .catch(next);
});
