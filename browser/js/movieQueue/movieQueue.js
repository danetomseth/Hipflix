// 'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('movieQueue', {
		url: '/me/moviequeue',
		controller: 'MovieQueueCtrl',
		templateUrl: '/js/movieQueue/movieQueue.html',
	})
});

app.controller('MovieQueueCtrl', function($scope, $rootScope, $state, AuthService, MovieQueueFactory, OrderFactory){
	$scope.emptyQueue = true;
	$scope.pendingMovies = [];
	$scope.activeMovies = [];
	$scope.watchedMovies = [];
	AuthService.getLoggedInUser()
	.then(user => {
		if(user) {
			$scope.user = user
			MovieQueueFactory.fetch(user._id).then(function(user) {
				var queue = user.movieQueue.queue;
				queue.forEach(function(item) {
					$scope.emptyQueue = false;
					if(item.status === 'active') {
						$rootScope.queueLength++;
						$scope.activeMovies.push(item);
					}
					else if (item.status === 'pending') {
						$rootScope.queueLength++;
						$scope.pendingMovies.push(item);
					}
					else if (item.status === 'returned') {
						$scope.watchedMovies.push(item);
					}
				})
			})	
		} else {
			MovieQueueFactory.getWishlist().
			then(wishlist => {
				$scope.emptyQueue = false;
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

	$scope.returnMovie = function(item) {
		OrderFactory.returnMovie(item).then(function() {
			$state.reload();
		})
	}

	


});