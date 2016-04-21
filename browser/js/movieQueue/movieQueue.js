app.config(function($stateProvider) {
	$stateProvider.state('movieQueue', {
		url: '/me/:userId/moviequeue',
		controller: 'MovieQueueCtrl',
		templateUrl: '/js/movieQueue/movieQueue.html',
	})
});



app.controller('MovieQueueCtrl', function($scope, AuthService, MovieQueueFactory){
	AuthService.getLoggedInUser()
	.then(user => {
		$scope.user = user
		MovieQueueFactory.fetch(user._id).then(function(user) {
			console.log('got queue', user);
			$scope.Userqueue = user.movieQueue.queue;
			console.log($scope.Userqueue);
			//$scope.$digest();
		})
	})


});