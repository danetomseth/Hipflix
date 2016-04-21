var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Movie = mongoose.model('Movies');

describe('Movies model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Movie).to.be.a('function');
    });

    describe('Movie Creation', function () {

        describe('create movie', function () {

            xit('should not create a movie without a title', function () {
                 var movie = new Movie();
                 console.log('*******', movie);
                expect(movie.title).to.equal(null);
            });
            it('create a movie with a titile', function () {
                var movie = new Movie({
                    title: "Our new movie"
                })
                expect(movie.title).to.equal("Our new movie");
            });
            it('can add multiple photo urls', function () {
                var movie = new Movie({
                    photos: ["01.jpg", "02.jpg", "03.jpg"]
                })
                expect(movie.photos.length).to.equal(3);
            });


        });
    });

});
