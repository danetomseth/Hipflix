app.config(function($stateProvider) {
    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    })
});

app.controller('SignupCtrl', function($scope, $state, SignupFactory) {
    $scope.addUser = function() {
        console.log('user', $scope.newUser);
        SingupFactory.createUser($scope.newUser)
        .then(user => {
            console.log('user created!!!');
            $state.go('signup');
        })
    }
})
