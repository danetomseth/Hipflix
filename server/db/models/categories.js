'use strict';

var mongoose = require('mongoose')
var schema = new mongoose.Schema({
	name: {
		type: String
	}
})


mongoose.model('Categories', schema);


// mongoose.extends
// virtuals drop on front, have to configure schema options
// or use a getter function in dateCreated
