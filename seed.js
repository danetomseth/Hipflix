/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('Users'));
var Addresses= Promise.promisifyAll(mongoose.model('Addresses'));
var Billing= Promise.promisifyAll(mongoose.model('Billing'));
var Categories= Promise.promisifyAll(mongoose.model('Categories'));
var MovieQueues= Promise.promisifyAll(mongoose.model('MovieQueues'));
var Movies= Promise.promisifyAll(mongoose.model('Movies'));
var Orders= Promise.promisifyAll(mongoose.model('Orders'));
var Reviews= Promise.promisifyAll(mongoose.model('Reviews'));
var Subscriptions= Promise.promisifyAll(mongoose.model('Subscriptions'));

var seedAddresses = function () {

    var addresses = [
        {
            user: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};
var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

connectToDb.then(function () {
    Addresses.findAsync({}).then(function (addresses) {
        if (addresses.length === 0) {
            return seedAddresses();
        } else {
            console.log(chalk.magenta('Seems to already be user Addresses, exiting!'));
            process.kill(0);
        }
    })
    Billing.findAsync({}).then(function (billing) {
        if (billing.length === 0) {
            return seedBilling();
        } else {
            console.log(chalk.magenta('Seems to already be user Billing, exiting!'));
            process.kill(0);
        }
    })
    Categories.findAsync({}).then(function (categories) {
        if (categories.length === 0) {
            return seedCategories();
        } else {
            console.log(chalk.magenta('Seems to already be categories, exiting!'));
            process.kill(0);
        }
    })
    MovieQueues.findAsync({}).then(function (movieQueues) {
        if (movieQueues.length === 0) {
            return seedMovieQueues();
        } else {
            console.log(chalk.magenta('Seems to already be movieQueues, exiting!'));
            process.kill(0);
        }
    })
    Movies.findAsync({}).then(function (movies) {
        if (movies.length === 0) {
            return seedMovies();
        } else {
            console.log(chalk.magenta('Seems to already be movies, exiting!'));
            process.kill(0);
        }
    })
    Orders.findAsync({}).then(function (orders) {
        if (orders.length === 0) {
            return seedOrders();
        } else {
            console.log(chalk.magenta('Seems to already be orders data, exiting!'));
            process.kill(0);
        }
    })
    Reviews.findAsync({}).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('Seems to already be review data, exiting!'));
            process.kill(0);
        }
    })
    Subscriptions.findAsync({}).then(function (sub) {
        if (sub.length === 0) {
            return seedSubscriptions();
        } else {
            console.log(chalk.magenta('Seems to already be subscriptions data, exiting!'));
            process.kill(0);
        }
    })
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
