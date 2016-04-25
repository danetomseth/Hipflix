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

app.controller('MovieCtrl', function($http, $scope, $state, MovieFactory, MovieQueueFactory, AuthService, movie) {
	$scope.movie = movie;
	AuthService.getLoggedInUser()
		.then(user => {
			$scope.user = user
		})

	$scope.addToQueue = function() {
		if($scope.user){
			MovieQueueFactory.addToQueue($scope.user, $scope.movie._id)
			.then(res => {
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