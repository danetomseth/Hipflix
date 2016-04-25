app.factory("SubscriptionFactory", function($http){

    var stripe = require("stripe")();

    return {
        fetchAll: function(){
            return $http.get("/api/subscriptions")
            .then(subscriptions => subscriptions.data)
        },
        update: function(user, sub){
            return $http.put("/api/users/subscription", {sub: sub, user: user})
            .then(user => user.data)
        },
        create: function(sub){
            //create the plan on stripe
            stripe.plans.create({
                amount: sub.price,
                interval: "month",
                name: sub.plan,
                currency: "usd",
                id: sub.plan
            })
            .then(plan => {
                //save it to our DB
                console.log(plan)
                sub.stripe = plan;
                return $http.post("/api/subscriptions", sub)
            })
            //should sanitize before sending back and remove stripe ID
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
