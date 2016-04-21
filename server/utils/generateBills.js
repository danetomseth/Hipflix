var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var Billing = mongoose.model('Billing');
var Users = mongoose.model('Users');
var moment = require('moment');
var Promise = require('bluebird');
const renewalPeriod = require("../env").RENEWAL_PERIOD

function makeBill(user){
    var newBill = {
        date: Date.now(),
        total: user.renewalPrice
    }
    var promised = [Billing.create(newBill), Users.findById(user._id)] // create the bill, find the user

    Promise.all(promised) // when you've created the bill and found the user
    .spread((bill, user) => {
        user.billingHistory.push(bill) // add the bill to the user
        user.renewalDate = moment().add(renewalPeriod, 'seconds') // bill the person again 30 seconds from now. would be better to round to the nearest midnight so that billing doesn't creep by seconds every billing cycle, but that's minor
        return user.save()
    })
}

//commented out below for sanity, uncomment to start generating bills

// new CronJob('*/30 * * * * *', // runs every 30 seconds, every day
//     function() { // this is the function that runs when it runs
//       var newBillPromises = []
//       Users.find({renewalDate: {$lt: moment()}}) // everyone who's renewalDate was before now
//       // .populate("subscription") // only needed if renewalPrice isn't populated
//       .then((users) => {
//         users.forEach(function(user){
//             var promise = makeBill(user); // make a bill for each user async
//             newBillPromises.push(promise)
//         })
//         return Promise.all(newBillPromises) // wait for all bills to be created
//     })
//       .then((newBills) => {
//         console.log("Cron ran and updated "+newBills.length+" bill(s)")
//     })
//   },
//   null, // we're not running a function when this ends, because it never ends
//   true, // start now: true
//   'America/New_York' // Set this to NY time, because why not.
// );
