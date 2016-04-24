'use strict'

var router = require('express').Router();
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Orders = mongoose.model('Orders');
var Movies = mongoose.model('Movies');
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
		//console.log('updated order', updatedOrder);
		updatedOrder.user.movieQueue.updateQueue(updatedOrder._id);
		res.send('Updated');
	})
	.catch(next);

})

