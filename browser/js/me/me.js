app.config(function($stateProvider) {
	$stateProvider.state('me', {
		url: '/me',
		templateUrl: '/js/me/me.html',
		controller: 'MyAccountCtrl'
	})
});


app.controller('MyAccountCtrl', function($scope,AuthService){
	AuthService.getLoggedInUser()
		.then(user => {
			$scope.user = user
		})

});
