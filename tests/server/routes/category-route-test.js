// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var Category = mongoose.model('Categories');
var Movie = mongoose.model('Movies');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Category Route', function(){

    beforeEach("Make me a connection", function(done){
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach("Clean up this mess", function(done){
        clearDB(done);
    });

    var guestAgent;
    var category, categories;

    var category1 = {
        name: "a test category"
    };
    var category2 = {
        name: "1984"
    };

    beforeEach('Create the guest', function(){
        guestAgent = supertest.agent(app);
    });

    beforeEach(function(done){
        Category.create([category1, category2], function (err, c){
            if (err) return done(err);
            categories = c;
            category = c[0];
            done()
        });
    });

    beforeEach(function(done){
        Movie.create({title: "Test Movie", category: [category._id]}, function (err, c){
            if (err) return done(err);
            done();
        });
    });

    it('should get all categories', function(done){
        guestAgent.get('/api/categories')
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            expect(res.body).to.be.instanceof(Array);
            expect(res.body).to.have.length(2);
            done();
        });
    });

    it('should return all movies in a single named category', function(done){
        guestAgent.get('/api/categories/'+category.name)
        .expect(200)
        .end(function(err, res){
            if(err) return done(err);
            expect(res.body).to.be.instanceof(Array); // should return movies
            expect(res.body[0].title).to.equal("Test Movie");
            done();
        });
    });

    it('should create new categories', function(done){
        guestAgent
        .post('/api/categories/')
        .send({name: "a created category"})
        .expect(200)
        .end(function(err, res){
            if (err) return done(err);
            expect(res.body.name).to.equal("a created category");
            expect(res.body._id).to.exist;
            Category.findById(res.body._id, function(err, c){
                if (err) return done(err);
                expect(c).to.not.be.null;
                expect(res.body.name).to.equal("a created category");
                done();
            });
        });
    });
})
