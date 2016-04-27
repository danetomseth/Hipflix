'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Reviews = mongoose.model('Reviews');
const Orders = mongoose.model('Orders');
const Movies = mongoose.model('Movies');
const Address = mongoose.model('Addresses');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const moment = require('moment');
// const renewalPeriod = require("../../../env").RENEWAL_PERIOD
const sendgrid = require('sendgrid')("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");
const keys = require("../../../env")
const renewalPeriod = keys.RENEWAL_PERIOD
const stripeKey = keys.PAYMENT_KEY;
const stripe = require("stripe")(stripeKey);

module.exports = router;

router.use(function(req,res,next){
    console.log('hello from the idx!');
    next();
})

const popMovies = function(queue) {
    const userMovies = [];
    queue.queue.forEach(function(elem) {
        Movies.findById(elem.movie)
            .then(function(movie) {
                userMovies.push(movie)
            })
    })
    return userMovies
};

let sendEmail = function(email, subject, message) { // I think there's a promise version of this, but it's ok as is for now
    console.log("sending email")
    return sendgrid.send({
        to: email,
        from: 'hello@hipfix.win',
        subject: subject,
        text: message
    }, function(err, json) {
        if (err) {
            return console.error(err);
        }
        console.log(json)
        return json
    });
}

router.param('userId', (req, res, next, userId) => {
    Users.findById(userId)
        .deepPopulate('addresses addresses.user movieQueue movieQueue.queue.movie movieQueue.queue subscription billingHistory billingHistory.user')
        .then(user => {
            if (!user) {
                res.sendStatus(404);
            } else {
                req.newUser = user;
                next();
            }
        })
        .catch(next);
});

router.get('/', (req, res, next) => {
    Users.find({})
        .then(users => res.json(users))
        .catch(next);
});

router.post('/', (req, res, next) => {
    console.log(2)
    let createdUser
    Users.findOne({
        email: req.body.email
    })
        .then((user) => {
            if (user) {
                const err = new Error('User already exists!');
                err.status = 403;
                return next(err);
            } else {
                return Users.create(req.body)
            }
        })
        .then(newUser => {
            createdUser = newUser;
            return sendEmail(createdUser.email, "Welcome to Hipflix, " + createdUser.first + "!", "You're signed up, " + createdUser.first + ". Now you can go browse our very hip selection of VHS at www.hipflix.win")
        })
        // a more personalized email template w/ HTML
        // .then(newUser => {
        //     createdUser = newUser;
        //     var email = new sendgrid.Email();

        //     email.addTo("hello@hipflix.win");
        //     email.setFrom("" + createdUser.email); // or createdUser.email.toString()
        //     email.setSubject('Welcome to Hipflix!');
        //     email.setText('You can now start browsing movies at www.hipflix.win');
        //     email.setHtml('<strong>You must be excited to start on Hipflix, %user%</strong>');
        //     email.addSubstitution("%user%", createdUser.first.toString());
        //     // email.addHeader('X-Sent-Using', 'SendGrid-API');
        //     // email.addHeader('X-Transport', 'web');
        //     // email.addFile({path: './gif.gif', filename: 'owl.gif'});
        //     sendgrid.send(email, function(err, json) {
        //       if (err) { return console.error(err); }
        //       console.log(json);
        //     });
        // })
        .then(conf => { // what does conf stand for?
            res.json(createdUser)
        })
        .catch(next);
});


router.post('/:userId/movie', (req, res, next) => {
    var allowance;
    if (req.newUser.subscription.allowance) {
        allowance = req.newUser.subscription.allowance;
    } else {
        allowance = 3;
    }
    req.newUser.movieQueue.addToQueue(req.body.movieId, allowance, req.newUser)
        .then(data => {
            res.status(204).send('created')
        })
        .catch(next)
})

router.post('/address', (req, res, next) => {
    var id = req.body._id
    Address.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    })
    .then(function(address) {
        console.log('sending');
        res.json('updated');
    })
})

router.delete('/:userId/movie/:itemId', (req, res, next) => {
    req.newUser.movieQueue.dequeue(req.params.itemId)
        .then(data => {
            res.status(204).send('deleted')
        })
        .catch(next)
});

router.get('/:userId', (req, res, next) => {
    res.json(req.newUser)
});

router.get('/:userId/moviequeue', (req, res, next) => {
    const movies = popMovies(req.newUser.movieQueue);
    res.json(req.newUser.movieQueue);
});

router.get('/:userId/reviews', (req, res, next) => {
    Reviews.find({
        user: req.newUser._id
    })
        .then(reviewsOfOneUser => res.json(reviewsOfOneUser))
        .catch(next);
});

router.get('/:userId/billing', (req, res, next) => {
    return stripe.charges.list({
            customer: req.newUser.stripeCustID
        })
        .then(orders => {
            res.send(orders.data)
        })
});

router.get('/:userId/orders', (req, res, next) => {
    Orders.find({
        user: req.newUser._id
    })
        .then(ordersOfOneUser => res.json(ordersOfOneUser))
        .catch(next);
});

router.put('/', (req, res, next) => {
    Users.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    })
        .exec()
        .then(updatedUser => {
            res.send('Updated');
        })

});

router.post('/payment', (req, res, next) => {
    let savedUser;
    Users.findById(req.user._id)
        .populate("subscription")
        .then(user => {
            savedUser = user
            return stripe.customers.create({
                source: req.body.token,
                email: req.user.email
            })
        })
        .then(stripeCust => {
            savedUser.stripeCustID = stripeCust.id
            return savedUser.save()
        })
})

router.put('/subscription', (req, res, next) => {
    // if(req.user.isAdmin || req.user === req.body.user){ // I think this will check if the current user is updating themselves, or is an admin
    //create a stripe payment customer
    let savedUser;
    Users.findById(req.body.user._id)
        .populate("subscription")
        .then(user => {
            savedUser = user
            if (user.stripeSubID) { // if they exist in stripe , update
                return stripe.customers.updateSubscription(
                    user.stripeCustID,
                    user.stripeSubID, {
                        plan: req.body.sub.plan
                    })
            } else { // otherwise, create
                return stripe.customers.createSubscription(
                    user.stripeCustID, {
                        plan: req.body.sub.plan
                    })
            }
        })
        .then((subscription) => { // then update the DB user with their subscription info
            savedUser.stripeSubID = subscription.id
            savedUser.subscription = req.body.sub._id; // we could use the stripe API for this, but no.
            savedUser.renewalPrice = req.body.sub.price; // this is being kept for posterity, I don't know if stripe keeps legacy payment info.
            // savedUser.renewalDate = moment().add(renewalPeriod, 'seconds') // deprecated with Stripe integration
            return savedUser.save()
        })
        .then(user => {
           sendEmail(user.email, "Thank you for your purchase, " + user.first + "!", "Congratulations on your new subscription of " + req.body.sub.plan + ", " + user.first + ". Now you can go browse our very hip selection of VHS at www.hipflix.win");
           return user;
        })
        .then(user => res.json(user))
        .catch(next)
})

// what does this route do?
router.post('/:userId/contact', (req, res) => {
    sendEmail(req.newUser.email, req.body.subject, req.body.message)
        .then(conf => res.sendStatus(201)) // what does conf stand for?
})
