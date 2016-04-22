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
		if(user) {
			$scope.user = user
			MovieQueueFactory.fetch(user._id).then(function(user) {
				var queue = user.movieQueue.queue;
				queue.forEach(function(item) {
					if(item.status === 'active') {
						$scope.activeMovies.push(item);
					}
					else if (item.status === 'pending') {
						$scope.pendingMovies.push(item);
					}
				})
			})	
		} else {
			MovieQueueFactory.getWishlist().
				then(wishlist => {
					$scope.pendingMovies = wishlist
				})
		}
	})

	$scope.removeMovie = function(item) {
		if($scope.user){
			MovieQueueFactory.dequeue($scope.user, item)
			.then(function(res) {
				if(res.status === 204) {
					$state.reload();
				}
			})	
		} else {
			MovieQueueFactory.removeFromWishlist(item)
				.then(wishlist => {
					console.log(wishlist)
				})
		}
	}


});