'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

var schema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    content: {
        type: String,
        minlength: 10,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: moment,
        required: true
    },
    bestFor: {
        type: [String]
    }
})

mongoose.model('Reviews', schema);