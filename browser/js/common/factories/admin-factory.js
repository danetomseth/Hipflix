app.factory('AdminFactory', function($http) {
	return {
		createUser: function(user) {
			return $http.post('/api/users', user)
			.then(function(data) {
				return 'Created'
			})
		},
		fetchAll: function() {
			return $http.get('/api/users')
			.then(function(res) {
				return res.data
			})
		},
		updateUser: function(user) {
			return $http.put('/api/users', user)
			.then(function() {
				return 'Updated'
			})
		}

	}
});