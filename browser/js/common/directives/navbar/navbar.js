app.directive('navbar', function ($rootScope, MovieQueueFactory, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Categories', state: 'categories' },
                { label: 'Movies', state: 'movies' },
                { label: 'Plans', state: 'subscription' },
                { label: 'My Account', state: 'me', auth: true },
                // { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            MovieQueueFactory.getWishlist()
                .then( wishlist => {
                    scope.wishlist = wishlist;
                    console.log(wishlist)
                })

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
