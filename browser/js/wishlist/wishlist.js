app.config(function($stateProvider) {
	$stateProvider.state('wishList', {
		url: '/moviequeue',
		controller: 'WishListCtrl',
		templateUrl: '/js/wishlist/wishList.html',
	})
});

app.controller('MovieQueueCtrl', function($scope, $state, MovieQueueFactory){
	$scope.pendingMovies = [];
	$scope.activeMovies = [];

	MovieQueueFactory.getWishlist()
	.then(wishlist => {
			$scope.pendingMovies = wishlist
	})
});