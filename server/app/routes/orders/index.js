'use strict'

var router = require('express').Router();
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Orders = mongoose.model('Orders');
var Movies = mongoose.model('Movies');
var MovieQueue = mongoose.model('MovieQueues');
module.exports = router;


router.get('/', (req, res, next) => {
	Orders.find({})
	.populate("user deliverables")
	.then(orders => res.json(orders))
	.catch(next);
});

router.get('/:orderId', (req, res, next) => {
	Orders.findById(req.params.orderId)
	.then(order => res.json(order))
	.catch(next);
});

router.put('/:orderId', (req, res, next) => {
	Orders.findById(req.params.orderId)
	.deepPopulate('user deliverables user.movieQueue')
	.then(order => {
		return order.returnMovie()
	})
	.then(updatedOrder => {
		var Que = updatedOrder.user.movieQueue;
		return Que.findInQueue(updatedOrder._id)
	})
	.then(function(updatedQ) {
		console.log('Everything updated!!!', updatedQ);
		res.send('Updated');
	})
	.catch(next);

})

