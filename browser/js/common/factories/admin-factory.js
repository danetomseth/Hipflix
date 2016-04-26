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
        },
        generateUser: function() {
            $http({
                method: 'GET',
                url: 'https://randomuser.me/api/?results=15&inc=name,email,location,picture',
                dataType: 'json'
            }).then(function(res) {
                var userArray = res.data.results
                userArray.forEach(function(user) {
                    var newUser = {
                        email: user.email,
                        password: 'password',
                        first: user.name.first,
                        last: user.name.last,
                        subscription: "571a684f306c41792aae2f1f",
                        photo: user.picture.thumbnail
                    }
                    console.log('single user', user);
                    $http.post('/api/users', newUser).then(function(res){
                        var savedUser = res.data;
                        console.log("saved", savedUser);
                        var address = {
                            street: user.location.street,
                            state: user.location.state,
                            zip: user.location.postcode,
                            _id: savedUser.address
                        }

                        return $http.post('/api/users/address', address)
                    })
                    .then(function(address) {
                        console.log('******', address);
                    })
                })
            })
        }

    }
});