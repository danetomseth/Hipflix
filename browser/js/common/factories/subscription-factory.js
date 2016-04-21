app.factory("SubscriptionFactory", function($http){
    return {
        fetchAll: function(){
            return $http.get("/api/subscriptions")
            .then(subscriptions => subscriptions.data)
        },
        update: function(user, sub){
            console.log(user, sub)
            return $http.put("/api/subscriptions", {sub: sub, user: user})
            .then(user => user.data)
        },
        create: function(sub){
            return $http.post("/api/subscriptions", sub)
            .then(sub => sub.data)
        },
        fetchBasic: function(){
            return $http.get("/api/subscriptions/basic")
                .then(sub => sub.data)
        },
        cancel: function(user, sub){
            return $http.put("/api/subscriptions",{sub: sub, user: user})
            .then(user => user.data)
        }
    }
})
