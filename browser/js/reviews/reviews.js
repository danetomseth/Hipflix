app.config(function($stateProvider) {
	$stateProvider
	.state('addReview', {
		url: '/movies/:movieId/addReview',
		controller: 'AddReviewCtrl',
		templateUrl: '/js/reviews/review-form.html'
	})
	.state('reviews', {
		url: '/movies/:movieId/reviews',
		controller: 'ReviewsCtrl',
		templateUrl: '/js/reviews/reviews.html',
		resolve: {
			movie: function($stateParams, MovieFactory) {
				return MovieFactory.fetchOne($stateParams.movieId);
			}
		}
	})
});