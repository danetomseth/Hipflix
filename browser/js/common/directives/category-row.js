app.directive('hfCategoryRow', function(MovieFactory, $uibModal) {
	return {
		restrict: 'E',
		scope: '=',
		templateUrl: 'js/common/directives/category-row.html',
		link: function(scope, element, attrs) {
			MovieFactory.findSimilar(scope.category._id, 5).then(function(movies) {
				console.log('category', scope.category);
				console.log('movies', movies);
				scope.movies = movies;
			})
		}
	}
});