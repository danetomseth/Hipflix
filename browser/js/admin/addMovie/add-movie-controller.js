app.controller('AddMovieCtrl', function($scope, $state, MovieFactory, $http, CategoriesFactory) {
	$scope.singleTag = "";
	$scope.singlePhoto = "";
	$scope.movieForm;
	$scope.newMovie = {
		title: '',
		year: '',
		duration: '',
		trailer: '',
		description: '',
		category: [],
		tags: [],
		photos: []
	};
	//$scope.categoryArray = [];
	//$scope.categories = ['drama', 'action', 'comedy'];
	CategoriesFactory.fetchAll()
	.then((categories) => {
		console.log('categories returned', categories);
		$scope.categories = categories;
		console.log($scope.categories);
	})
	$scope.addCategory = function(category) {
		console.log('category', category);
		$scope.newMovie.category.push(category._id)
	}
	$scope.addPhoto = function(photo) {
		console.log(photo);
		$scope.newMovie.photos.push(photo);
		$scope.singlePhoto = "";
	}
	$scope.addTag = function(tag) {
		$scope.newMovie.tags.push(tag);
		$scope.singleTag = "";
	}

    $scope.findMovie = function(imdbID){
        var rand = Math.floor(Math.random()*$scope.categories.length)
        var cat = $scope.categories[rand]
        $http.get("http://www.omdbapi.com/?i="+imdbID+"&plot=full&r=json")
        .then(movie => movie.data)
        .then(movie => {
            console.log(movie)
            $scope.newMovie = {
                title: movie.Title,
                year: movie.Year,
                category: [cat],
                duration: movie.Runtime.split(" ")[0],
                description: movie.Plot,
                photos: [movie.Poster],
                inventory: rand
            };
        })
    }

    $scope.addMovie = function(movie) {
      console.log('new movie', $scope.newMovie);
      MovieFactory.create($scope.newMovie)
      .then((newMovie) => {
         $state.go('admin');
     })
  }


})
