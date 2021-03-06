app.config(function($stateProvider) {
	$stateProvider.state('adduser', {
		url: '/admin/addUser',
		templateUrl: 'js/admin/addUser/addUser-template.html',
		controller: 'AddUserController',
		data: {
            authenticate: true
        }
	})
});

app.config(function($stateProvider) {
	$stateProvider.state('listusers', {
		url: '/admin/users',
		templateUrl: 'js/admin/addUser/list-users.html',
		controller: "ListUsersCtrl",
		data: {
            authenticate: true
        }
	})
});

app.controller('AddUserController', function($scope, $state, AdminFactory) {
	$scope.addUser = function() {
		if($scope.newUser.isAdmin === 'true') {
			$scope.newUser.isAdmin = true
		}
		else $scope.newUser.isAdmin = false
		AdminFactory.createUser($scope.newUser)
		.then(user => {
			console.log('user created!!!');
			$state.go('admin');
		})
	}
	$scope.randomUser = function() {
		AdminFactory.generateUser();
	}
});

