app.controller('MoviesCtrl', function($scope, MovieFactory, movies) {
	$scope.movies = movies
	// MovieFactory.fetchAll()
	// .then(function(res) {
	// 	$scope.movies = res
	// })
})