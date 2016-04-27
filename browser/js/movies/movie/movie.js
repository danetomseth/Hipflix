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
			},
			currentUser: function(AuthService) {
				return AuthService.getLoggedInUser()
			}
		}
	})
});

core.controller('MovieCtrl', function($scope, $state, $rootScope, MovieFactory, MovieQueueFactory, AuthService, movie) {
	$scope.isUser = false;
	console.log(currentUser);
	$scope.user = currentUser;
	if(currentUser !== null) $scope.isUser = true;
	$scope.isCollapsed = true;
	$scope.movie = movie;
	if($scope.movie.tailer) {
		$scope.movieTrailer = MovieFactory.setTrailerUrl($scope.movie.tailer)
	}

	$scope.addToQueue = function() {
		if($scope.isUser){
			MovieQueueFactory.addToQueue($scope.user, $scope.movie._id)
			.then(res => {
				$state.go('movieQueue');
			})
		} else {
			MovieQueueFactory.addToWishlist($scope.movie._id)
				.then(wishlist => {
					$state.go('wishList')
				});
		}

	}



});
