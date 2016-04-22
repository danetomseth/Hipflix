app.config(function($stateProvider) {
	$stateProvider.state('movieQueue', {
		url: '/me/moviequeue',
		controller: 'MovieQueueCtrl',
		templateUrl: '/js/movieQueue/movieQueue.html',
	})
});



app.controller('MovieQueueCtrl', function($scope, $state, AuthService, MovieQueueFactory){
	$scope.pendingMovies = [];
	$scope.activeMovies = [];
	AuthService.getLoggedInUser()
	.then(user => {
		$scope.user = user
		MovieQueueFactory.fetch(user._id).then(function(user) {
			var queue = user.movieQueue.queue;
			console.log('fetching movies', user);
			queue.forEach(function(item) {
				if(item.status === 'active') {
					$scope.activeMovies.push(item);
				}
				else if (item.status === 'pending') {
					$scope.pendingMovies.push(item);
				}
			})
		})
	})

	$scope.removeMovie = function(item) {
		MovieQueueFactory.dequeue($scope.user, item)
		.then(function(res) {
			if(res.status === 204) {
				$state.reload();
			}
		})
	}


});