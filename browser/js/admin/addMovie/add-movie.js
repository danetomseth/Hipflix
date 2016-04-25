app.config(function($stateProvider) {
	$stateProvider.state('addmovie', {
		url: '/admin/addmovie',
		controller: 'AddMovieCtrl',
		templateUrl: '/js/admin/addmovie/add-movie-template.html'
	});
});


app.config(function($stateProvider) {
	$stateProvider.state('editmovie', {
		url: '/admin/editmovie',
		controller: 'EditMovieCtrl',
		templateUrl: '/js/admin/addmovie/edit-movie.html'
	});
});




