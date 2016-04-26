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


app.controller('AddressCtrl', function($scope, $state, SignupFactory, user){
    $scope.user = user;
    console.log('user', user);
    $scope.saveAddress = function(address) {
        address._id = user.address;
        console.log('address');
        SignupFactory.createAddress(address).then(res => {
            $state.go('movieQueue');
        })
    }
    

});