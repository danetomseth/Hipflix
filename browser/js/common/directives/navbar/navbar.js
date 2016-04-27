app.directive('navbar', function($rootScope, MovieFactory, MovieQueueFactory, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope) {

            scope.items = [{
                    label: 'Home',
                    state: 'home'
                }, {
                    label: 'Categories',
                    state: 'categories'
                }, {
                    label: 'Movies',
                    state: 'movies'
                }, {
                    label: 'Plans',
                    state: 'subscription'
                }, {
                    label: 'My Account',
                    state: 'me',
                    auth: true
                },
                // { label: 'Members Only', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            MovieQueueFactory.getWishlist()
                .then(wishlist => {
                    scope.wishlist = wishlist;
                })

            scope.search = function(keyword) {
                MovieFactory.searchByName(keyword)
                    .then(movie => {
                        $state.go('movie', {
                            movieId: movie[0]._id
                        })
                    })
            }

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home');
                });
            };
            var activeMovies = function(movieArray) {
                var count = 0;
                var activeArray = [];
                movieArray.forEach(function(movie) {
                    if (movie.status !== 'returned') {
                        count++;
                        activeArray.push(movie);
                    }
                })
                return activeArray;
            }
            scope.$watch('moviequeue', function(newValue, oldValue) {
               console.log('Que Changed!', newValue);
               // scope.counter = scope.counter + 1;
            });
            // scope.$watch(
            //     "MovieQueueCtrl.queue",
            //     function handleFooChange(newValue, oldValue) {
            //         console.log("value", oldValue);
            //         console.log("new value", newValue);
            //     }
            // );
            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user
                }).then(user => {
                    MovieQueueFactory.fetch(scope.user._id)
                        .then(movies => {

                            scope.moviequeue = activeMovies(movies)
                            // console.log('Queue', scope.moviequeue);
                        })
                })
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});