app.config(function($stateProvider){
    $stateProvider.state('subscription', {
        url: "/subscription",
        templateUrl: "/js/subscription/subscription.html",
        controller: "SubscriptionCtrl"
    })
});

app.config(function($stateProvider){
    $stateProvider.state('subcancel', {
        url: "/subscription/cancel",
        templateUrl: "/js/subscription/subcancel.html",
        controller:"SubcancelCtrl"
    })
});

app.controller('SubscriptionCtrl', function($scope, $state, AuthService, SubscriptionFactory){
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
        .then(user => {
            console.log("updated", user)
            $state.go('home') // ultimately send this back to the users' billing page
        })
    }
})

app.controller('SubcancelCtrl',function($scope, $state, AuthService, SubscriptionFactory){
    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });

    SubscriptionFactory.fetchBasic().then(sub => {
         $scope.defaultSub = sub;
    })
   


    $scope.cancel = function(){
        SubscriptionFactory.cancel($scope.user, $scope.defaultSub)
            .then(user => {
                console.log("cancelled", user)
                $state.go('me')
            })
    }
})
