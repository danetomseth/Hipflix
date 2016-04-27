app.config(function($stateProvider) {
	$stateProvider.state('wishList', {
		url: '/wishlist',
		controller: 'WishListCtrl',
		templateUrl: '/js/wishlist/wishlist.html',
	})
});

app.controller('WishListCtrl', function($scope, $state, MovieQueueFactory){
	$scope.pendingMovies = [];
	$scope.activeMovies = [];
	MovieQueueFactory.getWishlist()
	.then(wishlist => {
			console.log('get wishlist',wishlist)
			$scope.pendingMovies = wishlist
	})



	$scope.removeMovie = function(item) {
	    MovieQueueFactory.removeFromWishlist(item)
			.then(wishlist => {
				console.log('wishlist after remove',wishlist)
			})
	}

	$scope.signup = function(){
		$state.go("signup");
	}

	$scope.login = function(){
		$state.go("login");
	}

	$scope.addMovies = function(){
		$state.go("movies");
	}
});