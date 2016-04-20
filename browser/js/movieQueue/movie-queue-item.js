app.directive('hfMoviequeueItem', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/movieQueue/movie-queue-item/movie-queue-item.html',
		scope: {
			movies:'='
		},	
		link: function(scope, element, attr) {

		}
	}
})