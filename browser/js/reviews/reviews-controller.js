app.controller('ReviewsCtrl', function($scope, ReviewsFactory, $stateParams, movie) {
	
	var movieId = $stateParams.movieId;
	
	$scope.reviews = movie.reviews;
	
	$scope.submitReview = ReviewsFactory.submitReview;

	// ReviewsFactory.fetchAllByMovie(movieId)
	// .then((res) => {
	// 	console.log('reviews submitted', res);
	// 	$scope.reviews = res;

	// })
})