app.config(function($stateProvider) {
	$stateProvider.state('addMovie', {
		url: '/admin/addmovie',
		controller: 'AddMovieCtrl',
		templateUrl: '/js/admin/add-movie-template.html'
	});
});




