app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller:'HomeCtrl',
		resolve: {
			currentUser: function(AuthService) {
				return AuthService.getLoggedInUser();
			},
			allCategories: function(CategoriesFactory) {
				return CategoriesFactory.fetchAll();
			},
			allMovies: function(MovieFactory) {
				return MovieFactory.fetchAll()
			},
			popUser: function(AdminFactory, currentUser) {
				return AdminFactory.fetchOne(currentUser._id)
			}
		}
	});
});


app.controller('HomeCtrl', function($q, $scope, CategoriesFactory, popUser, allCategories, allMovies, AuthService, currentUser){
	// CategoriesFactory.fetchAll()
	// .then(categories => {
 // 			// find movies of each category
 // 			var categoryPromises = categories.map(category => CategoriesFactory.fetchOne(category.name));
 // 			$q.all(categoryPromises)
 // 			.then(categoryMovies => {
 // 				for(var i=0; i < categoryMovies.length; i++){
 // 					categories[i].movies = categoryMovies[i];
 // 				}
 // 				return categories;
 // 			}) 			
 // 			.then(categories => {
 // 				$scope.categories = categories;
 // 			})
 // 		});
	$scope.currentUser = currentUser;
	$scope.allCategories = allCategories;
	$scope.allMovies = allMovies;
	$scope.popUser = popUser;
});
