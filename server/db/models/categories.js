'use strict';

var mongoose = require('mongoose')
var schema = new mongoose.Schema({
	name: {
		type: String,
        required: true
	}
})


mongoose.model('Categories', schema);
