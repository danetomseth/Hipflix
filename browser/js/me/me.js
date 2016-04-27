app.config(function($stateProvider) {
	$stateProvider.state('me', {
		url: '/me',
		templateUrl: '/js/me/me.html',
		controller: 'MyAccountCtrl',
		resolve: {
			currentUser: function(AuthService) {
				return AuthService.getLoggedInUser()
			},

			userOrders: function(OrderFactory, currentUser) {
				return OrderFactory.fetchUserOrders(currentUser._id)
			}
		}
	})
});

// app.controller('MyAccountCtrl', function($scope, currentUser, userOrders, userSubscription){

core.controller('MyAccountCtrl', function($scope, currentUser, userOrders, SubscriptionFactory){
	$scope.user = currentUser;
	$scope.orders = userOrders;
	if($scope.user.subscription) {
		return SubscriptionFactory.fetchOne(currentUser.subscription).then(function(subscription){
			$scope.subscription = subscription;
		})

	}



});
