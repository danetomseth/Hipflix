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

router.get('/stream', (req, res, next) => {
    //var stream = Movies.find().stream().pipe(writeStream);
    //res.set('Content-Type', 'application/json');
    // var stream = Movies.find({}).limit(10).stream({
    //     transform: JSON.stringify
    // });

    

    // Movies.findAll(function(err, cursor) {
    //     if (err) {
    //         console.dir(err);
    //         res.end(err);
    //     } else {
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         });
    //         console.log('cursor');

    //         //this crashes
    //         cursor.stream().pipe(JSONStream.stringify()).pipe(res);
    //         //cursor.stream().pipe(res);

    //     }
    // });

    // stream.on('data', function(doc) {
    //     console.log(doc);
    //     res.write(doc);
    // });
    // stream.on('end', function() {
    //     console.log('end');
    //     //stream.end() 
    //     res.end();
    // });
    // catalog.byTag(tag, function(err, cursor) {
    //     if (err) {
    //         console.dir(err);
    //         res.end(err);
    //     } else {
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         });

    //         //this crashes
    //         cursor.stream().pipe(res);

    //     }
    // });
    // res.set('Content-Type', 'application/json');
    // var stream = Movies.find().stream({
    //     transform: JSON.stringify
    // });
    // //stream.pipe(writeStream);
    // //var stream = Movies.find().stream({ transform: JSON.stringify });
    // stream.on('error', function(err) {
    //     console.error(err)
    // })
    // stream.on('data', function(doc) {
    //     //console.log('doc', doc)
    //     res.write(doc);
    // })
    // stream.on('end', function(doc) {
    //     res.send('finished')
    // })
})

router.get('/random', (req, res, next) => {
    Movies.findRandom({})
        .populate('category reviews')
        .then((movies) => res.json(movies))
        .catch(next)
})

router.get('/:movieId', (req, res, next) => res.json(req.movie));

router.get('/:movieId/reviews', (req, res, next) => {
    res.json(req.movie.reviews)
});



router.post('/', (req, res, next) => {
    Movies.create(req.body)
        .then((movie) => res.status(201).send(movie))
        .catch(next)
});

router.get('/similar/:categoryId/:limit', (req, res, next) => {
    var limitNum = Number(req.params.limit);
    Movies.findRandom({
        category: req.params.categoryId
    })
        .limit(limitNum)
        .then(movies => {
            res.send(movies);
        })
})

router.put('/', (req, res, next) => {
    Movies.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        new: true
    })
        .exec()
        .then(updatedMovie => {
            res.send('Updated');
        })
})

module.exports = router;