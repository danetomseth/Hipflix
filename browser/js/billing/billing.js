app.config(function($stateProvider) {
	$stateProvider.state('billing', {
		url: '/billing',
		templateUrl: '/js/billing/billing.html',
		controller:"BillingCtrl",
        resolve: {
            bills: function($http, AuthService, BillingFactory){
                return AuthService.getLoggedInUser()
                .then(user => {
                    return BillingFactory.getBills(user._id)
                })
                .then(bills => bills)
            }
        }
    })
});


app.controller('BillingCtrl', function($scope, bills){
    $scope.bills = bills
});
