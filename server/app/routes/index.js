'use strict';

var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));

router.use('/categories', require('./categories'));
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));
router.use('/subscriptions', require('./subscriptions'));
router.use('/reviews', require('./reviews'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
