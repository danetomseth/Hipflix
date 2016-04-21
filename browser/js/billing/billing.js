app.config(function($stateProvider) {
	$stateProvider.state('billing', {
		url: '/billing',
		templateUrl: '/js/billing/billing.html',
		controller:"BillingCtrl"
	})
})


app.controller('BillingCtrl', function($scope,AuthService){
	AuthService.getLoggedInUser()
		.then(user => {
			$scope.user = user
		})

})