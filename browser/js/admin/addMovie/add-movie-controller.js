app.controller('AddMovieCtrl', function($scope, $state, MovieFactory, CategoriesFactory) {
	$scope.singleCategory = "";
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
	$scope.categoryArray = [];
	$scope.categories = ['drama', 'action', 'comedy'];
	// CategoriesFactory.fetchAll()
	// .then((categories) => {
	// 	console.log('categories returned', categories);
	// 	$scope.categories = categories;
	// })
	$scope.addCategory = function(category) {
		$scope.newMovie.category.push($scope.singleCategory)
		//$scope.newMovie.category.push(category._id)
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

	$scope.addMovie = function(movie) {
		//console.log(movie);
		//console.log('form', $scope.movieForm.title);
		console.log('new movie', $scope.newMovie);
		MovieFactory.create($scope.newMovie);
	}


})