app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller:'HomeCtrl',
    });
});


app.controller('HomeCtrl', function($q, $scope, CategoriesFactory){

 	CategoriesFactory.fetchAll()
 		.then(categories => {

 			// find movies of each category
 			var categoryPromises = categories.map(category => CategoriesFactory.fetchOne(category.name));
 
 			$q.all(categoryPromises)
 				.then(categoryMovies => {
 					 for(var i=0; i < categoryMovies.length; i++){
 					 	categories[i].movies = categoryMovies[i];
 					 }
 					 return categories;
 				}) 			
 				.then(categories => {
 					$scope.categories = categories;
 				})
		});
})