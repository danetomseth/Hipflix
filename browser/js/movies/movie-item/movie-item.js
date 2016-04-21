app.directive('hfMovieItem', function(MovieFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/movies/movie-item/movie-item.html',
		
		link: function(scope, element, attr) {
			var container = angular.element(element.children()[0])
			element.on('mouseenter', function() {
				console.log('enter', container);
				container.addClass('movie-hover')
			})
			element.on('mouseleave', function() {
				console.log('leave', container);
				container.removeClass('movie-hover')
			})
		}
	}
})