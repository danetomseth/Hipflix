app.config(function($stateProvider) {
	$stateProvider.state('addmovie', {
		url: '/admin/addmovie',
		controller: 'AddMovieCtrl',
		templateUrl: '/js/admin/addmovie/add-movie-template.html'
	});
});




