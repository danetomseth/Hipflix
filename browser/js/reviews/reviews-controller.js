app.controller('ReviewsCtrl', function($scope, ReviewsFactory, $stateParams, movie) {
	var movieId = $stateParams.movieId;
	console.log('movieID', movieId);
	$scope.reviews = movie.reviews;
	console.log('movie moment date', movie.reviews[0].momentDate);
	console.log('movie date created', movie.reviews[0].dateCreated);
	// ReviewsFactory.fetchAllByMovie(movieId)
	// .then((res) => {
	// 	console.log('reviews submitted', res);
	// 	$scope.reviews = res;

	// })
})