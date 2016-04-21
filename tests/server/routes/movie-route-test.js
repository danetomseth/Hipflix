// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Movie = mongoose.model('Movies');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Members Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('Movies Route', function () {

		var guestAgent;
		var movie, movies;
		

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});
		beforeEach(function (done) {
			Movie.create([{
				title: 'Movie',
				year: '2005',
				photos: ['01', '02', '03']
			}, {
				title: 'Movie2'
			}], function (err, m) {
				if (err) return done(err);
				movies = m;
				movie = m[0];
				done();
			});
		});

		it('should get all movies', function (done) {
			guestAgent.get('/api/movies/' )
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body).to.be.instanceof(Array);
				expect(res.body).to.have.length(2);
				done();
			});
		});
		it('should get a single movie', function (done) {
			guestAgent.get('/api/movies/' + movie._id)
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				expect(res.body.title).to.equal(movie.title);
				done();
			});
		});

		it('POST one', function (done) {
		guestAgent
        .post('/api/movies')
        .send({
          title: 'Movie Made By Test'
        })
        .expect(201)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.title).to.equal('Movie Made By Test');
          expect(res.body._id).to.exist;
          Movie.findById(res.body._id, function (err, m) {
            if (err) return done(err);
            expect(m).to.not.be.null;
            expect(res.body.title).to.eql('Movie Made By Test');
            done();
          });
        });
      });

	});

	

});
