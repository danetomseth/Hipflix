app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    })
});



app.controller('SignupCtrl', function($scope, $state, MovieQueueFactory, SignupFactory, AuthService) {
    $scope.addUser = function() {
            SignupFactory.createUser($scope.newUser)
            .then(user => {
                return AuthService.login({email: $scope.newUser.email, password: $scope.newUser.password})
            })
            .then(() => {
                $state.go('subscription');
            })
        

    }
})
