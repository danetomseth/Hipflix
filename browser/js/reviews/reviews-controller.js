app.controller('MoviesCtrl', function($scope, MovieFactory) {
	MovieFactory.fetchAll()
	.then(function(res) {
		console.log('movies returned', res);
		$scope.movies = res
	})
})