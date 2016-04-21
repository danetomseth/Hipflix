app.factory('BillingFactory', function($http){
    return {
        getBills: function(userId){
            return $http.get('/api/users/'+userId+"/billing")
            .then(bills => bills.data)
        }
    }
})
