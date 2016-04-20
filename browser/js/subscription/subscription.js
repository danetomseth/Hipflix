app.config(function($stateProvider){
    $stateProvider.state('subscription', {
        url: "/subscription",
        templateUrl: "/js/subscription/subscription.html",
        controller: "SubscriptionCtrl"
    })
});

app.controller('SubscriptionCtrl', function($scope, AuthService, SubscriptionFactory){
    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });

    SubscriptionFactory.fetchAll()
    .then(subscriptions => {
        console.log(subscriptions);
        return $scope.subscriptions = subscriptions
    });

    $scope.submit = function(sub){
        if(!$scope.user) return alert("login or signup please")
            console.log($scope.user)
        return SubscriptionFactory.update($scope.user, sub)
        .then(user => console.log("updated", user))
    }
})
