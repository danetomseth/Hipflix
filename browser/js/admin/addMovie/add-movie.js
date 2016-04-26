app.config(function($stateProvider) {
	$stateProvider.state('addmovie', {
		url: '/admin/addmovie',
		controller: 'AddMovieCtrl',
		templateUrl: '/js/admin/addMovie/add-movie-template.html'
	});
});


app.config(function($stateProvider) {
	$stateProvider.state('editmovie', {
		url: '/admin/editmovie',
		controller: 'EditMovieCtrl',
		templateUrl: '/js/admin/addMovie/edit-movie.html'
	});
});




