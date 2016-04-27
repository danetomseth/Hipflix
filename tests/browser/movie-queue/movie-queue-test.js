describe('Movie Queue', function(){

    beforeEach(module('core'));

    var $rootScope;
    var $httpBackend;
    beforeEach(inject(function(_$rootScope_, _$httpBackend_){
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    var MovieQueueFactory;
    var UserFactory;
    var SignupFactory;
    beforeEach(inject(function($injector){
        MovieQueueFactory = $injector.get('MovieQueueFactory');
        UserFactory = $injector.get('UserFactory');
        SignupFactory = $injector.get('SignupFactory');
    }));


    it('should be an object', function () {
        expect(MovieQueueFactory).to.be.an('object');
    });
    //new user has movie queue
    it('should be created as an empty array when a new user signs up', function(done){
        $httpBackend.whenPOST('/api/users').respond({email: 'test@hipflix.win'});
        var user;
        SignupFactory.createUser({email: 'test@hipflix.win'}).then(function(newUser){
            user = newUser
            done();
        });

        $httpBackend.whenGET('/api/users/' + newUser._id + '/moviequeue')
        .respond(newUser)

        MovieQueueFactory.fetch(newUser._id)
        .then(function(user){
            expect(user.moviequeue).to.be.typeof('Array')
        })
    })

    //add movie adds movie to queue, goes to active if allowance is available, pending otherwise

    //return movie moves movie to previous, moves new movie to active, and generates shipping notice

    //change subscription updates allowance and re-shuffles pending/active queue


})
