app.config(function($stateProvider) {
	$stateProvider
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
	.state('addReview', {
		url: '/movies/:movieId/reviews/addReview',
		controller: 'ReviewsCtrl',
		templateUrl: '/js/reviews/review-form.html'
	})
});