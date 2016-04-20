app.config(function($stateProvider) {
	$stateProvider.state('addMovie', {
		url: 'admin/add-movie',
		controller: 'AddMovieCtrl',
		templateUrl: '/js/admin/add-movie-template.html'
	});
});




