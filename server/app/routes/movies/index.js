var express = require('express');
var router = express.Router();
//var path = require('path');
var mongoose = require('mongoose');

var Movies = mongoose.model('Movies');


router.param('movieId', (req, res, next, movieId) => {
    //might be able to use movieId instead of router.params.id
    Movies.findById(req.params.movieId)
    .populate('reviews')
    .then((movie) => {
    	if (!movie) {
            var err = new Error('empty movie')
            err.status = 404; //eventually want to redirect her to 404 page, pass to err handler
            return next(err);
          }
          req.movie = movie;
          next()
    }, (err) => {

    	err.message = 'Cannot Find Movie';
                throw err //next(err)
          })
    .catch(next);
})


router.get('/', (req, res, next) => {
  console.log(req.body);
  Movies.find({})
  .populate("category")
  .then((movies) => res.json(movies))
  .catch(next)
})

router.get('/:movieId', (req, res, next) => res.json(req.movie));

router.get('/:movieId/reviews', (req, res, next) => res.json(req.movie.reviews));

router.post('/', (req, res, next) => {
  Movies.create(req.body)
		.then((movie) => res.send(movie))
		.catch(next)

	// if(req.user.isAuthenticated && req.user.isAdmin){ // consider changing to use ensureAuthenticated
	// 	Movies.create(req.body)
	// 	.then((movie) => res.send(movie))
	// 	.catch(next)
	// }
})


module.exports = router;
