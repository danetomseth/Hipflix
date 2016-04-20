app.factory('ReviewsFactory', function($http) {
	return {
		fetchAllByUser: () => {
			return $http.get('/api/users/:userId/reviews').then(reviews => {
				return reviews.data;
			})
		},
		fetchAllByMovie: () => {
			return $http.get('/api/movies/:movieId/reviews').then(reviews => {
				return reviews.data;
			})
		},
		// stretch goal: fetch 1 single review >> edit.
		// fetchOne: (movieId) => {
		// 	return $http.get('/api/movies/'+ movieId).then(movie => movie.data)
		// },
		create: (postedReview) => {
			return $http.post('/api/reviews', postedReview);
		}
	}
})