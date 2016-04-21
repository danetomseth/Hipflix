app.directive('hfMovieItem', function(MovieFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/movies/movie-item/movie-item.html',
		
		link: function(scope, element, attr) {
			var box = angular.element(element.children());
			element.on('mouseenter', function() {
				console.log('enter', box);
				box.addClass('movie-hover');
			})
			element.on('mouseleave', function() {
				box.removeClass('movie-hover')
			})
		}
	}
})