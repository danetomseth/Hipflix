 'use strict';

const mongoose = require('mongoose');
const moment = require('moment');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    title: {
        type: String
    },
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
        default: Date.now,
        required: true
    },
    bestFor: {
        type: [String]
    }
});

schema.virtual('momentDate').get(function(){
    console.log('MOMENTDATE', this);
    return "hello";
    // return moment(this.dateCreated).fromNow();
})


schema.plugin(deepPopulate);

mongoose.model('Reviews', schema);