app.config(function($stateProvider) {
	$stateProvider.state('adduser', {
		url: '/admin/addUser',
		templateUrl: 'js/admin/addUser/addUser-template.html',
		controller: 'AddUserController'
	})
});

app.controller('AddUserController', function($scope, $state, AdminFactory) {
	$scope.addUser = function() {
		if($scope.newUser.isAdmin === 'true') {
			$scope.newUser.isAdmin = true
		}
		else $scope.newUser.isAdmin = false
		console.log('user', $scope.newUser);
		AdminFactory.createUser($scope.newUser)
		.then(user => {
			console.log('user created!!!');
			$state.go('admin');
		})
	}
})

