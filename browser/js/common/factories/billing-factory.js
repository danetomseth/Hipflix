app.factory('BillingFactory', function($http){

    // const stripeResponseHandler = function(status, response){
    //     $scope.form = null // clean up form and forget all data
    //     if(response.err) {
    //         $scope.disabled = false;
    //         console.log(response.error.message)
    //     } else {
    //         return response.id
    //     }
    // }

    return {
        getBills: function(userId){
            return $http.get('/api/users/'+userId+"/billing")
            .then(bills => bills.data)
        },
        updatePayment: function(token){
            return $http.post("/api/users/payment", {token: token})
            .then(userCard => userCard.data)
        }
    }
})
