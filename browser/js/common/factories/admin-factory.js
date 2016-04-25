app.factory('AdminFactory', function($http) {
    return {
        createUser: function(user) {
            return $http.post('/api/users', user)
                .then(function(res) {
                    return res.data
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
        updateUser: function(user) {
            console.log('updating user', user);
            return $http.put('/api/users', user)
                .then(function(res) {
                    return res.data
                })
        }

    }
});