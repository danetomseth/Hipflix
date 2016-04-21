//'use strict';
const crypto = require('crypto');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    first: {
        type: String
    },
    last: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Addresses'
    },
    movieQueue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieQueues'
    },
    likes: {
        type: [String]
    },
    renewalDate: {
        type: Date
    },
    signupDate: {
        type: Date,
        default: moment
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscriptions'
    },
    billingHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Billing'
    },
    salt: {
        type: String
    },
    // twitter: {
    //     id: String,
    //     username: String,
    //     token: String,
    //     tokenSecret: String
    // },
    facebook: {
        id: String
    },
    google: {
        id: String
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

schema.plugin(deepPopulate)

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('Users', schema);