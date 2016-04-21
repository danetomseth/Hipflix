'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users"
	},
	deliverables: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movies' }]
	},
	date: {
		type: Date,
		default: moment
	},
	tracking: {
		type: Number,
		default: (Math.random() * 10000000)
	}
})

mongoose.model('Orders', schema);