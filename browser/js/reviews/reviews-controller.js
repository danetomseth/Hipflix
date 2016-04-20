app.controller('ReviewsCtrl', function($scope, ReviewsFactory) {
	ReviewsFactory.fetchAll()
	.then((res) => {
		console.log('reviews submitted', res);
		$scope.reviews = res;
	})
})