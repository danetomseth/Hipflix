app.factory('AdminFactory', function($http) {
	return {
		createUser: function(user) {
			return $http.post('/api/users', user)
			.then(function(data) {
				console.log('return data', data);
				return 'Created'
			})
		}
	}
})