var express = require('express');
var router = express.Router();
//var path = require('path');
var mongoose = require('mongoose');
var Movies = mongoose.model('Movies');
var Categories = mongoose.model('Categories')


router.get('/', (req, res, next) => {
	Categories.find({})
	.then((categories) => categories)
	.catch(next)
})


router.get('/:categoryName', (req, res, next) => { //may later move to movies route
	Categories.find({name: req.params.categoryName})
	.then((category) => Movies.find({category: category._id}))
	.populate('category')
	.then((movies) => res.json(movies))
	.catch(next)
})


router.post('/', (req, res, next) => {
	Categories.create(req.body)
	.then((newCategory) => res.json(newCategory))
})

module.exports = router