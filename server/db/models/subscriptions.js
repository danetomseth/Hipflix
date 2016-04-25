'use strict';
const _ = require('lodash');

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

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['stripe']);
};

mongoose.model('Subscriptions', schema);
