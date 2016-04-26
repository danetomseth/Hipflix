app.config(function($stateProvider) {
	$stateProvider.state('me', {
		url: '/me',
		templateUrl: '/js/me/me.html',
		controller: 'MyAccountCtrl',
		resolve: {
			currentUser: function(AuthService) {
				return AuthService.getLoggedInUser()
			},
			userSubscription: function(SubscriptionFactory, currentUser) {
				return SubscriptionFactory.fetchOne(currentUser.subscription)
			},
			userOrders: function(OrderFactory, currentUser) {
				return OrderFactory.fetchUserOrders(currentUser._id)
			}
		}
	})
});


app.controller('MyAccountCtrl', function($scope, currentUser, userOrders, userSubscription){
	$scope.user = currentUser;
	$scope.orders = userOrders;
	$scope.subscription = userSubscription;
	console.log('sub:',$scope.subscription);
});
