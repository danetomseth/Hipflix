app.config(function($stateProvider) {
	$stateProvider.state('movie', {
		url: '/movies/:movieId',
		templateUrl: 'js/movies/movie/movie-template.html',
		controller: 'MovieCtrl',
		resolve: {
			movie: function($stateParams, MovieFactory) {
				return MovieFactory.fetchOne($stateParams.movieId)
				.then(movie => {
					return movie
				})
			}
		}
	})
});

app.controller('MovieCtrl', function($scope, $state, $rootScope, MovieFactory, MovieQueueFactory, AuthService, movie) {
	$scope.isUser = false;
	$scope.isCollapsed = false;
	$scope.movie = movie;
	console.log('****************', $rootScope.queueLength);
	
	if($scope.movie.tailer) {
		$scope.movieTrailer = MovieFactory.setTrailerUrl($scope.movie.tailer)
	}

	AuthService.getLoggedInUser()
		.then(user => {
			$scope.user = user
			$scope.isUser = user;
		})

	$scope.addToQueue = function() {
		console.log('addToQueue')
		if($scope.isUser){
			// $scope.isUser = true;
			MovieQueueFactory.addToQueue($scope.user, $scope.movie._id)
			.then(res => {
				$rootScope.queueLength++;
				console.log($rootScope.queueLength);
				$state.go('movieQueue');
			})	
		} else {
			MovieQueueFactory.addToWishlist($scope.movie._id)
				.then(wishlist => {
					console.log(wishlist)
					$state.go('wishList')
				});
		}

	}



});