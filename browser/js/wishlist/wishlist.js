app.config(function($stateProvider) {
	$stateProvider.state('wishList', {
		url: '/wishlist',
		controller: 'WishListCtrl',
		templateUrl: '/js/wishlist/wishList.html',
	})
});

app.controller('WishListCtrl', function($scope, $state, MovieQueueFactory){
	$scope.pendingMovies = [];
	$scope.activeMovies = [];
	MovieQueueFactory.getWishlist()
	.then(wishlist => {
			console.log(wishlist)
			$scope.pendingMovies = wishlist
	})



	$scope.removeMovie = function(item) {
	    MovieQueueFactory.removeFromWishlist(item)
			.then(wishlist => {
				console.log(wishlist)
			})
	}

	$scope.signup = function(){
		$state.go("signup");
	}
});