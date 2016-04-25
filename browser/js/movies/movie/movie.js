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

app.controller('MovieCtrl', function($scope, $state, MovieFactory, MovieQueueFactory, AuthService, movie) {
	$scope.isUser = false;
	$scope.isCollapsed = false;
	$scope.movie = movie;

	function getId() {
	    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	    const match = $scope.movie.trailer.match(regExp);

	    if (match && match[2].length == 11) {
	        $scope.movieTrailer = match[2];
	        console.log('MOVIE TRAILER', $scope.movieTrailer)
	        console.log('MOVIE TRAILER', movie.trailer)
	    } else {
	        return 'error';
    	}
	}

	AuthService.getLoggedInUser()
		.then(user => {
			$scope.user = user
			console.log('user', user);
			if(user !== null) {
				$scope.isUser = true;
			}
		})

	$scope.addToQueue = function() {
		if($scope.user){
			$scope.isUser = true;

			MovieQueueFactory.addToQueue($scope.user, $scope.movie._id)
			.then(res => {
				$state.go('movieQueue');
			})	
		} else {
			MovieQueueFactory.addToWishlist($scope.movie._id)
				.then(wishlist => console.log(wishlist));
		}

	}



});