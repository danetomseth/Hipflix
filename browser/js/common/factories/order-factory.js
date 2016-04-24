app.factory('OrderFactory', function($state, $http) {
	return {
		fetchAll: function() {
			return $http.get('api/orders').then(function(res) {
				console.log('orders in factory', res);
				return res.data;
			})
		},
		fetchOne: function(id) {
			return $http.get('/api/orders/'+id).then(function(res) {
				return res.data;
			})
		}
	}
});