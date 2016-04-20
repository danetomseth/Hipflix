app.config(function($stateProvider) {
	$stateProvider.state('movieQueue', {
		url: '/:userId/moviequeue',
		controller: 'MovieQueueCtrl',
		templateUrl: '/js/movieQueue/movieQueue.html',
		resolve: {
			user: function($stateParams) {
				var user = new User({_id: $stateParams.id});
				return user.fetch();        // create user factory for accessing user info
			}
		}
	})
})



app.controller('MovieQueueCtrl', function($scope, user, MovieQueueFactory){
	$scope.user = user;
})