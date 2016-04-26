app.config(function($stateProvider) {
	$stateProvider.state('orders', {
		url: '/admin/orders',
		templateUrl: 'js/admin/orders/orders-template.html',
		controller: 'OrderCtrl',
		data: {
            authenticate: true
        }
	})
});


app.config(function($stateProvider) {
	$stateProvider.state('order', {
		url: '/admin/order',
		templateUrl: 'js/admin/orders/order-template.html',
		controller: 'OrderCtrl',
		data: {
            authenticate: true
        }
	})
});


core.controller('OrderCtrl', function($scope, $state, OrderFactory) {
	OrderFactory.fetchAll().then(function(orders) {
			console.log('orders returned', orders);
		$scope.orders = orders;
	})
});
