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

app.controller('CategoriesCtrl', function($scope, CategoriesFactory){

    CategoriesFactory.fetchAll()
    .then(categories => $scope.categories = categories)

});

app.controller('CategoryCtrl', function($scope, $stateParams, CategoriesFactory){

    CategoriesFactory.fetchOne($stateParams.category)
    .then(movies => {
        console.log(movies)
        $scope.movies = movies
    })

});
