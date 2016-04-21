var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Category = mongoose.model('Categories');

describe("The Category model", function(){
    beforeEach("Make that connection", function(done){
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear the DB', function(done){
        clearDB(done);
    });

    var category = {name: "test category"}

    it('should exist', function(){
        expect(Category).to.be.a('function');
    });

    it("should make categories", function(){
        Category.create(category)
        .then(function(){
            expect(Category.findOne().name).to.equal("test category")
        })
    })
})
