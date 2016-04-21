app.controller('ReviewsCtrl', function($scope, ReviewsFactory, $stateParams, movie) {
	console.log(movie);
	var movieId = $stateParams.movieId;
	console.log('movieID', movieId);
	console.log('movie moment date', movie.reviews[0].momentDate);
	console.log('movie date created', movie.reviews[0].dateCreated);
	$scope.reviews = movie.reviews;
	console.dir(movie.reviews[0])

	// ReviewsFactory.fetchAllByMovie(movieId)
	// .then((res) => {
	// 	console.log('reviews submitted', res);
	// 	$scope.reviews = res;

	// })
})