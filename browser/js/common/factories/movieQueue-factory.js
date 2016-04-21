app.factory('MovieQueueFactory', function($http) {
	return {
		fetch: function(userId) {
			return $http.get('/api/users/' + userId + '/moviequeue')
			.then(function(res) {
				console.log('user data', res.data);
				return res.data
			})
		}
	}
});