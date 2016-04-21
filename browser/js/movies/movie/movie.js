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

app.controller('MovieCtrl', function($scope, $state, MovieFactory, AuthService, movie) {
	console.log('single movie', movie);
	$scope.movie = movie;
	AuthService.getLoggedInUser()
		.then(user => {
			$scope.user = user
		})

	$scope.addToQueue = function() {
		console.log('add to queue', $scope.movie);
		MovieFactory.addToQueue($scope.user, $scope.movie._id);
	}
});