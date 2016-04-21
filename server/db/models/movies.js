'use strict';

var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	year: {
		type: Number
	},
	description: {
		type: String,
	},
	duration: {
		type: Number
	},
	category: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Categories'
	}],
	tags: {
		type: [String]
	},
	photos: {
		type: [String]
	},
	trailer: {
		type: String
	},
	reviews: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Reviews'
	}],
	inventory: {
		type: Number
	}
})


schema.plugin(deepPopulate);


mongoose.model('Movies', schema);
