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
		},
        findMovie: (imdbID) => {
            return $http.get("http://www.omdbapi.com/?i="+imdbID+"&plot=full&r=json")
            .then(movie => movie.data)
            .then(movie => {
                return {
                    title: movie.Title,
                    year: movie.Year,
                    duration: movie.Runtime.split(" ")[0],
                    description: movie.Plot,
                    photos: [movie.Poster],

                };
            })
        }
    }
})
