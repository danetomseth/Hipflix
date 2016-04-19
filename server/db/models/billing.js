'use strict';

var mongoose = require("mongoose");
var moment = require('moment');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
		required: true
	},
	date: {
		type: Date,
		defualt: moment,
		required: true
	},
	total: {
		type: Number, // subsctioption price. not a ref because subscription prices might change
		required: true
	}
})

mongoose.model('Billing', schema)