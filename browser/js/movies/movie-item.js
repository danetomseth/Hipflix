app.directive('movieItem', function(MovieFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/movies/movie-item.html',
		scope: {
			movie: '='
		}, 
		link: function(scope, element, attr) {

		}
	}
})