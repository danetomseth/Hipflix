'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	queue: [{
		status: { 
			type: String,
			enum:['pending','rented','returned']
		},
		movie: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Movies"
		},
		reviewed: {
			type: Boolean
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





mongoose.model('MovieQueues', schema)

