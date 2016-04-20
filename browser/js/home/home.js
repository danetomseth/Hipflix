app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:'HomeCtrl'
    });
});

var Promise = require('bluebird')

app.controller('HomeCtrl', function($scope, CategoriesFactory,MovieFactory){

	CategoriesFactory.fetchAll()
		.then(categories => {
			$scope.categories = categories			
		})

	MovieFactory.fetchAll()
		.then(movies => {
			$scope.movies = movies
		})


});