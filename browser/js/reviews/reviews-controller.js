app.controller('ReviewsCtrl', function($scope, ReviewsFactory) {
	ReviewsFactory.fetchAllByMovie()
	.then((res) => {
		console.log('reviews submitted', res);
		$scope.reviews = res;
	})
})