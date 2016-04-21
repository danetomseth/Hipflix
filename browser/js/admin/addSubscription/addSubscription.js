app.config(function($stateProvider) {
    $stateProvider.state('addsubscription', {
        url: '/admin/addsubscription',
        controller: 'AddSubscriptionCtrl',
        templateUrl: 'js/admin/addSubscription/addSubscription-template.html'
    })
});

app.controller('AddSubscriptionCtrl', function($scope, $state, SubscriptionFactory) {
    $scope.newSubscription = {}

    $scope.addSubscription = function() {
        // console.log(newSub)
        var sub = {
            plan: $scope.newSubscription.plan,
            price: $scope.newSubscription.price,
            allowance: $scope.newSubscription.allowance
        }
        SubscriptionFactory.create(sub)
        .then(newSubscription => {
            console.log('created', newSubscription);
            $state.go('admin');
        })
    }
});
