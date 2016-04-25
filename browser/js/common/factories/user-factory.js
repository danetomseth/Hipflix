app.factory('UserFactory', function($http) {
    return {
        createUser: function(user) {
            return $http.post('/api/users', user)
            .then(function(data) {
                console.log('return data', data);
                return 'Created'
            })
        },
        changePassword: function(password, email){
            var email = email || ""
            return $http.put('/api/users', {password: password, email: email})
            .then(user => user.password)
        }
    }
})
