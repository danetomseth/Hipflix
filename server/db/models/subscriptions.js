'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	plan: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	allowance: {
		type: Number,
		required: true
	}
})

mongoose.model('Subscriptions', schema);