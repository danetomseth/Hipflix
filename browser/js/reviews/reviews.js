app.config(function($stateProvider) {
	$stateProvider
	.state('reviews', {
		url: '/movies/:movieId/reviews',
		controller: 'ReviewsCtrl',
		templateUrl: '/js/reviews/reviews.html'
	})
	.state('addReview', {
		url: '/movies/:movieId/reviews/addReview',
		controller: 'ReviewsCtrl',
		templateUrl: '/js/reviews/review-form.html'
	})
})