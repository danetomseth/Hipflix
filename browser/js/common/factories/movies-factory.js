core.factory('MovieFactory', function($http) {
	return {
		fetchAll: function() {
			return $http.get('/api/movies').then(movies => {
				return movies.data
			})
		},
        fetchAllRandom: function() {
            return $http.get('/api/movies/random').then(movies => {
                return movies.data
            })
        },
        fetchStream: function() {
            return $http.get('/api/movies/stream').then(movies => {
                console.log('data in factory', movies.data);
                return movies.data
            })
        },
		fetchOne: (movieId) => {
			return $http.get('/api/movies/'+ movieId).then(res => res.data)
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
        setTrailerUrl: (url) => {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            const match = trailer.match(regExp);

            if (match && match[2].length == 11) {
                const movieTrailer = 'https://www.youtube.com/embed/' + match[2];
                return movieTrailer;
            } else {
                return 'error';
            }
        },
        findMovie: (imdbID) => {
            var id = imdbID.slice(26, -1)
            return $http.get("http://www.omdbapi.com/?i="+id+"&plot=full&r=json")
            .then(res => res.data)
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
                    if(movie.imdbRating === 'N/A') {
                        movie.imdbRating = 8;
                    }
                    var inv = Math.floor(Math.random()*allCategories.length) + 1;
                    var newMovie = {
                        title: movie.Title,
                        year: movie.Year,
                        duration: movie.Runtime.split(" ")[0],
                        description: movie.Plot,
                        photos: [movie.Poster],
                        rating: movie.imdbRating / 2,
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
