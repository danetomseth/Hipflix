'use strict';

var mongoose = require('mongoose');
var random = require('mongoose-random');
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
	rating: {
		type: Number,
		default: 5
	},
	inventory: {
		type: Number
	}
})


schema.plugin(deepPopulate);
schema.plugin(random, { path: 'r' });

schema.statics.findByKeyword = function(keyword){
	var regex = "(" + keyword + ")"
 	var myRegExp = new RegExp(regex, "i");
    return this.find({title: myRegExp}).exec()
}

schema.methods.updateInventory = function(movie) {
	console.log("this", this);
	console.log("movie", movie);
}
  

mongoose.model('Movies', schema);
