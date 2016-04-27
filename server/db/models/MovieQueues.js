//'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Orders');
const sendgrid = require('sendgrid')("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");


const schema = new mongoose.Schema({
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

// var newOrder = function(user, queue) {
// 	console.log('creating order', user.owner, queue);
// 	return Order.create({
// 		user: user.owner,
// 		deliverables: queue.movie
// 	})

// }

// var shiftQueue = function(user) {
// 	var check = false
// 	for(var i = 0; i < user.queue.length; i++) {
// 		if(user.queue[i].status === 'pending' && !check) {
// 			user.queue[i].status = 'active';
// 			newOrder(user, user.queue[i])
// 			user.activeQueue++;
// 			check = true;
// 		}
// 		if(check) {
// 			user.queue[i].priority --;
// 		}
// 	}
// 	return user;
// }

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

let sendEmail = function(email, subject, message) { 
    return sendgrid.send({
        to: email,
        from: 'orders@hipfix.win',
        subject: subject,
        text: message
    }, function(err, json) {
        if (err) {
            return console.error(err);
        }
        console.log(json)
        return json
    });
}

schema.methods.addToQueue = function(movieId, allowance,currentUser) {
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
			return user.createOrder(user.owner, movieId)
			.then(function(order) {
				user.activeQueue ++
				newMovie.orderId = order._id
				user.queue.push(newMovie);
				return user.save()
			})
			.then(user => {
				console.log('THIS IS USER', user);
				sendEmail(currentUser.email, "Woohoo! Your order is successful, " + currentUser.first + "!", "We know how excited you are about these movies on the way, " + currentUser.first + ". But did you know you can order more and upgrade your plan at www.hipflix.win ?")
				return user;
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
	//
}


schema.methods.updateQueue = function(queueItem) {
	var user = this;
	queueItem.status = 'returned'
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
		return MovieQ.save();
	})
	
};








mongoose.model('MovieQueues', schema)

