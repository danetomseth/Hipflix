'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

let schema = new mongoose.Schema({
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
        default: moment,
        required: true
    },
    bestFor: {
        type: [String]
    }
});

schema.virtual('momentDate').set(function(){
    return moment(this.dateCreated).fromNow();
})

mongoose.model('Reviews', schema);