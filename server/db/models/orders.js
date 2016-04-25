'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users"
	},
	deliverables: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Movies' 
	},
	date: {
		type: Date,
		default: moment
	},
	tracking: {
		type: Number,
		default: Math.floor((Math.random() * 10000000))
	},
	status: { 
		type: String,
		enum:['delivered', 'returned'],
		default: 'delivered'
	}
})


//Presave hook to send email
schema.plugin(deepPopulate);

schema.methods.returnMovie = function(id) {
	this.status = 'returned';
	console.log("movie returned");
	return this.save();
}

mongoose.model('Orders', schema);