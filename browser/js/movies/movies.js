app.config(function($stateProvider) {
	$stateProvider.state('movies', {
		url: '/movies',
		controller: 'MoviesCtrl',
		templateUrl: '/js/movies/movies.html'
	})
})