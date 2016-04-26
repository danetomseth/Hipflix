app.config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

core.controller('LoginCtrl', function($scope, $rootScope, AuthService, $state, MovieQueueFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.sendLogin = function(loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function() {
            return AuthService.getLoggedInUser()
                //$state.go('home');
        })
            .then(function(user) {
                console.log('user from login', user);
                if(user._id) {
                    return MovieQueueFactory.fetch(user._id)
                }
            })
            .then(function(populatedUser) {
                $rootScope.queueLength = 5;

                populatedUser.movieQueue.queue.forEach(function(elem) {
                    if (elem.status !== 'returned') {
                        $rootScope.queueLength++;
                    }
                })
                console.log($rootScope.queueLength);
                $state.go('home');
            })

        .catch(function() {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
