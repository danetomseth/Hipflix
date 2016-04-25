app.controller('MoviesCtrl', function($scope, MovieFactory) {
	MovieFactory.fetchAll()
	.then(function(res) {
		$scope.movies = res
	})
})