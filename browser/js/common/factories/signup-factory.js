core.factory('SignupFactory', function($http) {
    return {
        createUser: function(user) {
            return $http.post('/api/users', user)
            .then(function(data) {
                console.log('return data', data);
                return 'Created'
            })
        },
        createAddress: function(address) {
        	console.log('address', address);
        	return $http.post('/api/users/address', address).then(function(res) {
        		console.log('res', res);
        		return res.data;
        	})
        }
    }
})
