app.factory('MovieFactory', function($http) {
	return {
		fetchAll: function() {
			return $http.get('/api/movies').then(movies => {
				return movies.data
			})
		},
		fetchOne: (movieId) => {
			return $http.get('/api/movies/'+ movieId).then(movie => movie.data)
		},
		create: (newMovie) => {
			return $http.post('/api/movies', newMovie)
		}
	}
})