app.factory('MovieQueueFactory', function($http) {
	// var wishlistCount = { count: 0 }
	var cachedWishlist = [];

	return {
		fetch: function(userId) {
			return $http.get('/api/users/' + userId + '/moviequeue')
			.then(function(res) {
				return res.data
			})
		},
		dequeue: function(user, item) {
			return $http.delete('/api/users/'+user._id+'/movie/'+item._id)
			.then(res => res);
		},
		addToQueue: (user, id) => {
			return $http.post('/api/users/'+user._id+'/movie', {movieId: id})
		},
		addToWishlist:(movieId) => {
			return $http.post("/api/wishlist", {movieId: movieId})
			.then(wishlist => {
				angular.copy(wishlist.data, cachedWishlist);
				return wishlist.data
			})

		},
		getWishlist: () => {
			return $http.get("/api/wishlist")
				.then(wishlist => {
						angular.copy(wishlist.data, cachedWishlist);
						return cachedWishlist					
				})
				
		},
		removeFromWishlist: (movie) => {
			return $http.delete("/api/wishlist" + movie._id)
				.then(wishlist => {
					angular.copy(wishlist.data, cachedWishlist);
					return cachedWishlist
				})
		}

		
	}
});