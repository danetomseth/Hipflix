'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	queue: [{
		status: { 
			type: String,
			enum:['pending','active','returned']
		},
		movie: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Movies"
		},
		reviewed: {
			type: Boolean,
			default: false
		},
		priority:{
			type: Number
		},
		orderId:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Orders"
		}
	}]
})


var shiftQueue = function(user) {
	for(var i = 0; i < user.queue.length; i++) {
		if(user.queue[i].status === 'pending') {
			user.queue[i].status = 'active';
			user.queue[i].priority--;
			break;
		}
	}
	return user;
}

var checkStatus = function(user) {
	var count = 0;
	user.queue.forEach(function(item) {
		if(item.status === 'active') {
			count++;
		}
	})
	return count;
}

schema.methods.addToQueue = function(movieId) {
	var user = this;
	var check = true;
	var newMovie = {
		movie: movieId,
		status: 'active',
		priority: user.queue.length
	}
	user.queue.forEach(function(item) {
		if(item.movie._id == movieId) {
			check = false;
		}
	})
	if(check) {
		if(checkStatus(user) > 2) {
			newMovie.status = 'pending'
		}
		user.queue.push(newMovie);
		return user.save()
	}
	else {
		//need to promisify new error to handle correctly
		return user.save()
	}
}

schema.methods.dequeue = function(itemId) {
	var user = this;
	user.queue.forEach(function(item, index) {
		if(item._id == itemId) {
			user.queue.splice(index, 1);
		}
	})
	user = shiftQueue(user);
	return user.save()
}





mongoose.model('MovieQueues', schema)

