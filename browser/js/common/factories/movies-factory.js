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
        findSimilar: (categoryId, limit) => {
            return $http.get('/api/movies/similar/'+categoryId+'/'+limit)
            .then(res => {
                console.log('response', res.data);
                return res.data
            })
        },
        findMovie: (imdbID) => {
            var id = imdbID.slice(26, -1)
            return $http.get("http://www.omdbapi.com/?i="+id+"&plot=full&r=json")
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
        },
        populateDb: (imdbString, allCategories) => {
            var inv = Math.floor(Math.random()*allCategories.length) + 1;
            var imdbArray = imdbString.split(',')
            imdbArray.forEach(function(url) {
                var urlRegEx = /(title\/)(tt\d+)/ig;
                var id = urlRegEx.exec(url)[2];
                $http.get("http://www.omdbapi.com/?i="+id+"&plot=full&r=json")
                .then(movie => movie.data)
                .then(movie => {
                    var categories = movie.Genre.replace(/\s/ig, '').split(',');
                    var newCat = [];
                    allCategories.forEach(function(cat) {
                        if(categories.indexOf(cat.name) !== -1) {
                            newCat.push(cat);
                        }
                    })
                    if(movie.Metascore === 'N/A') {
                        movie.Metascore = 50;
                    }

                    var newMovie = {
                        title: movie.Title,
                        year: movie.Year,
                        duration: movie.Runtime.split(" ")[0],
                        description: movie.Plot,
                        photos: [movie.Poster],
                        rating: movie.Metascore / 10,
                        inventory: inv,
                        category: newCat

                    };
                    return newMovie
                })
                .then(function(movie) {
                    console.log('movie to save', movie);
                    return $http.post('/api/movies', movie)

                })
                .then(function(savedMovie) {
                    console.log('Movie Saved!!');
                })
            })
        },

        searchByName:(keyword) => {
            return $http.get('/api/movies/search?keyword=' + keyword).then(movie => movie.data)

        },
        updateMovie: (movie) => {
            return $http.put("/api/movies", movie)
        }
    }
})
