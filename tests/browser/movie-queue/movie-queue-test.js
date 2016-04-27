describe('Movie Queue', function(){
    var x = 0
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
        x++
        MovieQueueFactory = $injector.get('MovieQueueFactory');
        UserFactory = $injector.get('UserFactory');
        SignupFactory = $injector.get('SignupFactory');
    }));

    it('should be an object', function () {
        expect(MovieQueueFactory).to.be.an('object');
    });

    describe("signup flow", function(){
        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        //new user has movie queue
        it('should be created as an empty array when a new user signs up', function(done){
            var email = Math.random()+"@hipflix.win"
            var user;

            $httpBackend.whenPOST('/api/users').respond({email: email});

            SignupFactory.createUser({email: email}).then(function(newUser){
                console.log("new")
                user = newUser
                done();
            });

            console.log("saved", user)
            console.log('/api/users/' + user._id + '/moviequeue')

            $httpBackend.whenGET('/api/users/' + user._id + '/moviequeue')
            .respond(user)

            MovieQueueFactory.fetch(user._id)
            .then(function(user){
                expect(user.moviequeue).to.be.typeof('Array')
            })

            $httpBackend.flush();
        })

        //add movie adds movie to queue, goes to active if allowance is available, pending otherwise

        //return movie moves movie to previous, moves new movie to active, and generates shipping notice

        //change subscription updates allowance and re-shuffles pending/active queue


    })

})
