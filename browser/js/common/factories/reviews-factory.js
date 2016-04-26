core.factory('ReviewsFactory', function($http) {
	return {
		fetchAll: () => {
			return $http.get('/api/reviews').then(reviews => reviews.data)
		},
		fetchAllByUser: (userId) => {
			return $http.get('/api/users/' + userId + '/reviews').then(reviews => reviews.data)
		},
		fetchAllByMovie: (movieId) => {
			return $http.get('/api/movies/' + movieId + '/reviews').then(reviews => reviews)
		},
		// stretch goal: fetch 1 single review >> edit.
		// fetchOne: (movieId) => {
		// 	return $http.get('/api/movies/'+ movieId).then(movie => movie.data)
		// },
		submitReview: (postedReview) => {
			return $http.post('/api/reviews', postedReview);
		}
	}
})
