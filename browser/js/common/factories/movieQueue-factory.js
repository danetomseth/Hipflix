core.factory('MovieQueueFactory', function($http) {

	var cachedWishlist = [];

	var cachedMoviequeue = [];

	return {
		fetch: function(userId) {
			return $http.get('/api/users/' + userId + '/moviequeue')
			.then(function(res) {
				angular.copy(res.data.queue, cachedMoviequeue)
				return cachedMoviequeue
			})
		},
		dequeue: function(user, item) {
			return $http.delete('/api/users/'+user._id+'/movie/'+item._id)
			.then(res => {
				return res.data
			});
		},
		addToQueue: (user, id) => {
			return $http.post('/api/users/'+user._id+'/movie', {movieId: id})
		},
		addToWishlist:(movieId) => {
			return $http.post("/api/wishlist", {movieId: movieId})
			.then(wishlist => {
				// only movieId
				angular.copy(wishlist.data, cachedWishlist);
				return wishlist.data
			})

		},
		getWishlist: () => {
			return $http.get("/api/wishlist")
				.then(wishlist => {
						// wishlist with movie detail infos
						angular.copy(wishlist.data, cachedWishlist);
						return cachedWishlist
				})

		},
		removeFromWishlist: (movie) => {
			return $http.delete("/api/wishlist/" + movie._id)
				.then(removedMovie => {
					var removedMovieId = removedMovie.data[0]
					// modify the cachedWishlist with movie detail infos
					var indToRemove;
					cachedWishlist.forEach((movie,ind) => {
						if(movie._id === removedMovieId) {
							indToRemove = ind;
						}
					})
					cachedWishlist.splice(indToRemove,1);
					return cachedWishlist
				})
		}


	}
});
