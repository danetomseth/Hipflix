//'use strict';

var mongoose = require('mongoose');
var Order = mongoose.model('Orders');
var Movies = mongoose.model('Movies');



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


var updateInventory = function(movieId, value) {
	
	return Movies.findOne({
		_id: movieId
	})
	.then(function(movie) {
		if(value === 'minus') {
			movie.inventory--;
		}
		else {
			movie.inventory++;
		}

		return movie.save()
	})
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

var checkStatus = function(queue) {
	var count = 0;
	queue.forEach(function(item) {
		if(item.status === 'pending') {
			count++;
		}
	})
	return count;
}

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
			var movie;
			return user.createOrder(user.owner, movieId)
			.then(function(order) {
				user.activeQueue ++
				newMovie.orderId = order._id
				movie = order.deliverables
				user.queue.push(newMovie);
				return user.save()
			})
			.then(function(user) {
				return updateInventory(movie, 'minus')
			})
			.then(function(updatedMovie) {
				//yeahhhh
				return
			})

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

schema.methods.createOrder = function(userId, movieId) {
	return Order.create({
		user: userId,
		deliverables: movieId
	})
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

schema.methods.findInQueue = function(id) {
	var MovieQ = this
	var Queue = MovieQ.queue;
	Queue.forEach(function(elem) {
		if(elem.status === 'active') {
			if(elem.orderId.toString() === id.toString()) {
				MovieQ.updateQueue(elem);
				MovieQ.activeQueue--;
				return;
			}
		}
	})
	if(checkStatus(MovieQ.queue)) {
		return MovieQ.shiftQueue().then(function(Q) {
			return Q.save();
		})
	}
	else {
		return MovieQ.save()
	}
}


schema.methods.updateQueue = function(queueItem) {
	var user = this;
	queueItem.status = 'returned'
	updateInventory(queueItem.movie, 'plus')
	.then(function(movie) {
		//yeah...I know
	})
	return
}


schema.methods.shiftQueue = function() {
	var movieIndex;
	var MovieQ = this;
	var check = false
	for(var i = 0; i < MovieQ.queue.length; i++) {
		if(MovieQ.queue[i].status === 'pending' && !check) {
			movieIndex = i;
			check = true;
		}
		if(check) {
			MovieQ.queue[i].priority --;
		}
	}
	return MovieQ.createOrder(MovieQ.owner, MovieQ.queue[movieIndex].movie)
	.then(function(order) {
		MovieQ.queue[movieIndex].orderId = order._id;
		MovieQ.queue[movieIndex].status = 'active';
		MovieQ.activeQueue++;
		return updateInventory(MovieQ.queue[movieIndex].movie, 'plus')
		 
	})
	.then(function(movie) {
		return MovieQ.save();
	})
	
	
};








mongoose.model('MovieQueues', schema)

