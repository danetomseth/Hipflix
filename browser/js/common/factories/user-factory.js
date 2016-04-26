core.factory('UserFactory', function($http) {
    return {
        createUser: function(user) {
            return $http.post('/api/users', user)
            .then(function(data) {
                console.log('return data', data);
                return 'Created'
            })
        },
        fetchOne: function(userId) {
            return $http.get('/api/users/' + userId).then(function(res) {
                return res.data;
            })
        },
        fetchAll: function() {
            return $http.get('/api/users')
                .then(function(res) {
                    return res.data
                })
        },
        changePassword: function(password, email){
            var email = email || ""
            return $http.put('/api/users', {password: password, email: email})
            .then(user => user.password)
        }
    }
})
