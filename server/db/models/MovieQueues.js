'use strict';

var mongoose = require('mongoose');

var Order = mongoose.model('Orders');

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
	}],
	activeQueue: {
		type: Number,
		default: 0
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users"
	}
})


//1) add movie > active > generate order

//2) active full > add to pending

//3) movie returned > pending (3) > active ^

var newOrder = function(userId, movieId) {
	console.log('creating order', userId, movieId);
	Order.create({
		user: userId,
		deliverables: movieId
	})
	.then(order => {
		console.log('Order created!!', order);
	})
}

var shiftQueue = function(user) {
	var check = false
	for(var i = 0; i < user.queue.length; i++) {
		if(user.queue[i].status === 'pending' && !check) {
			user.queue[i].status = 'active';
			newOrder(user.owner, user.queue[i].movie)
			user.activeQueue++;
			check = true;
		}
		if(check) {
			user.queue[i].priority --;
		}
	}
	return user;
}

var checkPending = function (user) {
	var count = 1;
	user.queue.forEach(function(elem) {
		if(elem.status === "pending") {
			count++
		}
	})
	return count;
}

// var checkStatus = function(user) {
// 	var count = 0;
// 	user.queue.forEach(function(item) {
// 		if(item.status === 'active') {
// 			count++;
// 		}
// 	})
// 	return count;
// }

schema.methods.addToQueue = function(movieId, allowance) {
	var user = this;
	var check = true;
	var newMovie = {
		movie: movieId,
		status: 'pending',
		priority: 0
	}
	user.queue.forEach(function(item) {
		if(item.movie._id === movieId) {
			check = false;
		}
	})
	if(check) {
		if(user.activeQueue < allowance) {
			newMovie.status = 'active'
			//call new order
			newOrder(user.owner, movieId)
			user.activeQueue ++
		}
		else {
			newMovie.priority = checkPending(user)
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
			user.activeQueue--;
			user.queue.splice(index, 1);
		}
	})
	if(user.queue.length === 0) {
		user.activeQueue = 0;
	}
	user = shiftQueue(user);
	return user.save()
}





mongoose.model('MovieQueues', schema)

