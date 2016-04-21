app.controller('AddReviewCtrl', function($scope,$stateParams,$state, AuthService, ReviewsFactory) {
	
	$scope.movieId = $stateParams.movieId;
	
	AuthService.getLoggedInUser().then(user => {
		$scope.user = user
	})
	
	$scope.submitReview = function(newReview){
		var reviewToPost = {user: $scope.user._id, title: newReview.title, movie: $scope.movieId, content: newReview.content, rating: newReview.rating}
		console.log('reviewToPost', reviewToPost)
		ReviewsFactory.submitReview(reviewToPost)
			.then(newReview => {
				$state.go('reviews', {movieId: $scope.movieId})
			})
	}
	
});


app.controller('ReviewsCtrl', function($scope, $state, ReviewsFactory, movie) {

	$scope.movie = movie;
	
});