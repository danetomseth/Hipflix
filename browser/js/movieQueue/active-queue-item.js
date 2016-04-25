app.directive('hfActivequeueItem', function($state, MovieFactory, OrderFactory) {
    return {
        restrict: 'E',
        templateUrl: '/js/movieQueue/active-queue-item.html',
        link: function(scope, element, attr) {
            scope.returnMovie = function(item) {
                OrderFactory.returnMovie(item).then(function() {
                	$state.reload();
                })
            }
        }
    }
});