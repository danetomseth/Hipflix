app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            currentUser: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            allCategories: function(CategoriesFactory) {
                return CategoriesFactory.fetchAll();
            },
            allMovies: function(MovieFactory) {
                return MovieFactory.fetchAll()
            }

        }
    });
});

app.config(function($stateProvider) {
    $stateProvider.state('home.detail', {
        controller: 'RecCtrl',
        templateUrl: 'js/common/directives/recommendation/rec-view-template.html',
        resolve: {
            allUsers: function(UserFactory) {
                return UserFactory.fetchAll();
            },
            populatedUser: function(AdminFactory, currentUser) {
            	return AdminFactory.fetchOne(currentUser._id)
            }
        }


    })
})


core.controller('HomeCtrl', function($q, $scope, $state, CategoriesFactory, currentUser, allCategories, allMovies, AuthService) {

    $scope.currentUser = currentUser;
    //$scope.currentUser = true; //setting to true just to test
    if ($scope.currentUser) {
    	$scope.activeUser = true;
    	$state.transitionTo('home.detail');
    }
    $scope.allCategories = allCategories;
    $scope.allMovies = allMovies;

});
