app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    })
});

app.controller('SignupCtrl', function($scope, $state, SignupFactory, AuthService) {
    $scope.addUser = function() {
        console.log('user', $scope.newUser);
        SignupFactory.createUser($scope.newUser)
        .then(user => {
            return AuthService.login({email: $scope.newUser.email, password: $scope.newUser.password})
        })
        .then(() => {
            console.log('user created!!!');
            $state.go('subscription');
        })
    }
})
