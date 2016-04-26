app.config(function($stateProvider) {
	$stateProvider
        .state('categories', {
          url: '/categories',
          templateUrl: '/js/categories/categories.html',
          controller: 'CategoriesCtrl'
        })
        .state('category', {
            url: '/categories/:category',
            templateUrl: '/js/categories/category.html',
            controller: 'CategoryCtrl'
        });
});

core.controller('CategoriesCtrl', function($scope, CategoriesFactory){

    CategoriesFactory.fetchAll()
    .then(categories => $scope.categories = categories)

});

core.controller('CategoryCtrl', function($scope, $stateParams, CategoriesFactory){

    CategoriesFactory.fetchOne($stateParams.category)
    .then(movies => {
        console.log(movies)
        $scope.movies = movies
    })

});
