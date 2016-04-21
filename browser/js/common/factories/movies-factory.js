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
			console.log('movie', newMovie);
			return $http.post('/api/movies', newMovie)
		},
		addToQueue: (user, id) => {
			console.log('movieid', id);
			console.log('user', user);
			return $http.post('/api/users/'+user._id+'/addmovie', {movieId: id})
		}
	}
})