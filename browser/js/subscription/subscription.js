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


app.controller('SubscriptionCtrl', function($q,$scope, $state, AuthService, BillingFactory,MovieQueueFactory,SubscriptionFactory){

    $scope.form = { // remove from production if desired, or leave as UI guidance
        number: 4242424242424242,
        exp_month: 12,
        exp_year: 17,
        cvc: 123
    };

    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });

    SubscriptionFactory.fetchAll()
    .then(subscriptions => {
        console.log(subscriptions);
        return $scope.subscriptions = subscriptions
    });

     MovieQueueFactory.getWishlist()
    .then(wishlist => {
            console.log('get wishlist',wishlist)
            $scope.wishList = wishlist
    })

    $scope.submit = function(sub){
        if(!$scope.user) return alert("login or signup please")
            console.log($scope.user)
        SubscriptionFactory.update($scope.user, sub)
        .then(user => {
            console.log("updated", user)
            // if the user has already added some movies to the wishlist, add the movies in the wishlist
            // into its movie queue.
            if($scope.wishList.length > 0){
                    var arrOfPromises = $scope.wishList.map(movie => {
                        return MovieQueueFactory.addToQueue(user, movie._id)
                    })
                    $q.all(arrOfPromises)
                      .then(()=>{
                        console.log("all the movies in the wishlist into the moviequeue")
                        return user
                      })
               
            } else {
                return user
            }
        })
        .then((user) => {
            $state.go('address') // ultimately send this back to the users' billing page
        })
    }

    const stripeResponseHandler = function(status, response){
        $scope.form = null // clean up form and forget all data
        if(response.err) {
            $scope.disabled = false;
        } else {
            BillingFactory.updatePayment(response.id)
        }
    };

    $scope.disabled = false
    $scope.payment = function(){
        Stripe.setPublishableKey('pk_test_6BRu0k0Y6igqEqpVqySELRmW');
                // Disable the submit button to prevent repeated clicks:
                $scope.disabled = true
                // Request a token from Stripe:
                console.log(1)
                Stripe.card.createToken($scope.form, stripeResponseHandler);
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
