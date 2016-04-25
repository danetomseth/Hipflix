'use strict';

var mongoose = require("mongoose");
var moment = require('moment');

var schema = new mongoose.Schema({

	date: {
		type: Date,
		default: moment,
		required: true
	},
	total: {
		type: Number, // subscription price. not a ref because subscription prices might change, but this should be constant
		required: true
	}
})

mongoose.model('Billing', schema)
