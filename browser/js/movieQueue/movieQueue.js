app.config(function($stateProvider) {
	$stateProvider.state('movieQueue', {
		url: '/moviequeue',
		controller: 'MovieQueueCtrl',
		templateUrl: '/js/movieQueue/movieQueue.html',
	})
})



app.controller('MovieQueueCtrl', function($scope,AuthService){
	AuthService.getLoggedInUser()
		.then(user => {
			$scope.user = user
		})

})