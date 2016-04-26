app.config(function($stateProvider) {
	$stateProvider.state('address', {
		url: '/address',
		templateUrl: '/js/address/address.html',
		controller:"AddressCtrl",
        resolve: {
            user: function(AuthService){
                return AuthService.getLoggedInUser()
            }
        }
    })
});


core.controller('AddressCtrl', function($scope, $state, SignupFactory, user){
    $scope.user = user;
    $scope.saveAddress = function(address) {
        address._id = user.address;
        SignupFactory.createAddress(address).then(function() {
            console.log('resolved');
            $state.go('movieQueue');
        })
    }


});
