app.controller('AddMovieCtrl', function($scope, $state, MovieFactory, CategoriesFactory) {
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
		$scope.categories = categories;
	})
	$scope.addCategory = function(category) {
		$scope.newMovie.category.push(category._id)
	}
	$scope.addPhoto = function(photo) {
		$scope.newMovie.photos.push(photo);
		$scope.singlePhoto = "";
	}
	$scope.addTag = function(tag) {
		$scope.newMovie.tags.push(tag);
		$scope.singleTag = "";
	}

    $scope.findMovie = function(imdbID){
        MovieFactory.findMovie(imdbID)
        .then(movie => {
            var rand = Math.floor(Math.random()*$scope.categories.length)
            var cat = $scope.categories[rand]
            movie.inventory = rand;
            movie.category = [cat];
            $scope.newMovie = movie
        })

    }
    $scope.populateDb = function(imdbString) {
    	MovieFactory.populateDb(imdbString, $scope.categories)
    }

    $scope.addMovie = function(movie) {
      MovieFactory.create($scope.newMovie)
      .then((newMovie) => {
       $state.go('admin');
   })
  }


})
