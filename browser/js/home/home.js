app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:'HomeCtrl'
    });
});


app.controller('HomeCtrl', function($scope, CategoriesFactory,MovieFactory){

	CategoriesFactory.fetchAll()
		.then(categories => {
			$scope.categories = categories
		})

	MovieFactory.fetchAll()
		.then(movies => {
			movies.forEach(function(movie) {
				movie.image = movie.photos[0];
			})
			console.log('image', movies);
			$scope.movies = movies
		})


});
