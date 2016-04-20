app.factory("SubscriptionFactory", function($http){
    return {
        fetchAll: function(){
            return $http.get("/api/subscriptions")
            .then(subscriptions => subscriptions.data)
        },
        update: function(user, sub){
            return $http.put("/api/subscriptions", {sub: sub, user: user})
            .then(user => user.data)
        }
    }
})
