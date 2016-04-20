app.factory('ReviewsFactory', function($http) {
	return {
		fetchAll: () => {
			return $http.get('/api/reviews').then(reviews => reviews.data)
		},
		fetchAllByUser: () => {
			return $http.get('/api/users/' + userId + '/reviews').then(reviews => reviews.data)
		},
		fetchAllByMovie: () => {
			return $http.get('/api/movies/' + movieId + '/reviews').then(reviews => reviews.data)
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