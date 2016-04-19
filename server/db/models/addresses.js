'use strict';

var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	address: {
		type: String
	},
	state: {
		type: String
	},
	zip:{
		type: Number
	}

})

mongoose.model('Addresses', schema)