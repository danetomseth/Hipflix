'use strict';

var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.use('/categories', require('./categories'));
router.use('/environment', require('./environment'));
router.use('/movies', require('./movies'));
router.use('/orders', require('./orders'));
router.use('/reviews', require('./reviews'));
router.use('/subscriptions', require('./subscriptions'));
router.use('/users', require('./users'));
router.use('/wishlist', require('./wishlist'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
