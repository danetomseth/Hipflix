core.factory('OrderFactory', function($state, $http) {
	return {
		fetchAll: function() {
			return $http.get('api/orders').then(function(res) {
				return res.data;
			})
		},
		fetchUserOrders: function(userId) {
			return $http.get('api/orders/user/'+userId).then(function(res) {
				console.log('orders in factory', res);
				return res.data;
			})
		},
		fetchOne: function(id) {
			return $http.get('/api/orders/'+id).then(function(res) {
				return res.data;
			})
		},
		returnMovie: function(queueItem) {
			return $http.put('/api/orders/'+queueItem.orderId).then(function(res) {
				$state.reload();
			})
		}
	}
});
