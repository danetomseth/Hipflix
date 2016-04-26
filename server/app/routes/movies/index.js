'use strict';
const express = require('express');
const router = express.Router();
//const path = require('path');
const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);


let Movies = mongoose.model('Movies');

router.get('/search', (req, res, next) => {

  Movies.findByKeyword(req.query.keyword)
  .then(movie => {
    res.json(movie)
  })
})

router.param('movieId', (req, res, next, movieId) => {
    //might be able to use movieId instead of router.params.id
    Movies.findById(req.params.movieId)
    .populate('category reviews')
    .deepPopulate('reviews.user reviews.movie')
    .then((movie) => {
      if (!movie) {
        let err = new Error('empty movie')
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
  Movies.find({})
  .populate('category reviews')
  .then((movies) => res.json(movies))
  .catch(next)
})

router.get('/:movieId', (req, res, next) => res.json(req.movie));

router.get('/:movieId/reviews', (req, res, next) => {
  res.json(req.movie.reviews)});



router.post('/', (req, res, next) => {
  Movies.create(req.body)
  .then((movie) => res.status(201).send(movie))
  .catch(next)
});

router.get('/similar/:categoryId/:limit', (req, res, next) => {
  
  var limitNum = Number(req.params.limit);
  Movies.find({
    category: req.params.categoryId
  })
  .sort({'rating': -1})
  .limit(limitNum)
  .then(movies => {
    res.send(movies);
  })
})

router.put('/', (req, res, next) => {
  Movies.findOneAndUpdate({_id:req.body._id}, req.body, {new: true})
  .exec()
  .then(updatedMovie => {
    res.send('Updated');
  })
})

module.exports = router;
