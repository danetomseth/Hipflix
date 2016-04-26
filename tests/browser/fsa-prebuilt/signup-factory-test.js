describe('SignupFactory', function(){

    beforeEach(module('core'));

    var $httpBackend;
    var $rootScope;
    beforeEach('Get tools', inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
    }));

    var SignupFactory;
    beforeEach('Get SignupFactory', inject(function($injector){
        SignupFactory = $injector.get('SignupFactory');
    }))

    it('should be an object', function(){
        expect(SignupFactory).to.be.an('object');
    });

    describe('createUser', function(){

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should create a new user and persist in the DB', function(done){
            $httpBackend.expectPOST('/api/users');
            $httpBackend.whenPOST('/api/users').respond({email: 'test@hipflix.win'});

            SignupFactory.createUser({email: 'test@hipflix.win'}).then(function(){
                done();
            });

            $httpBackend.flush()
        });

        it('should not create a user if the email address is taken', function(done){
            $httpBackend.whenPOST('/api/users').respond({status: 403, message: "User already exists!"});

            SignupFactory.createUser({email: 'test@hipflix.win'}).then(function(){
                done();
            });

            $httpBackend.flush()


        })
    })
})
