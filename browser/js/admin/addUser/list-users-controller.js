core.controller('ListUsersCtrl', function($scope, AdminFactory) {
	AdminFactory.fetchAll()
	.then(function(users) {
		$scope.users = users;
	})
})
