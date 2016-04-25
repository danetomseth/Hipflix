'use strict';

const router = require('express').Router();
const mongoose = require('mongoose');
const Movies = mongoose.model("Movies")
const Promise = require("bluebird");

module.exports = router;


router.get('/', (req, res, next) => {
	console.log("Get wishlist")
	if(req.session.wishlist){
		Promise.all(req.session.wishlist.map( movieId => {
			return Movies.findById(movieId)
		}))
		.then(movies => {
      		res.status(200).send(movies);
		})
	} else {
		res.send([]);
	}

} )

router.post('/', (req, res, next) => {
	console.log("Post wishlist")
	console.log("req.session", req.session)
	if(!req.session.wishlist){
		req.session.wishlist = [];
	} 

	if (req.session.wishlist.indexOf(req.body.movieId) === -1) {
		req.session.wishlist.push(req.body.movieId);
		res.status(201).send(req.session.wishlist);
	} else {
		res.send(req.session.wishlist)
	}
	
} )


router.delete('/:movieId', (req, res, next) => {
	var toRemoveInd = req.session.wishlist.indexOf(req.params.movieId)
	var removedmovie = req.session.wishlist.splice(toRemoveInd, 1);
	res.send(removedmovie)
})

















