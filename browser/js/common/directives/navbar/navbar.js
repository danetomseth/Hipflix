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
                },  
                {
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
            //Would like to include this to only show movies in active queue
            // var activeMovies = function(movieArray) {
            //     var count = 0;
            //     var activeArray = [];
            //     movieArray.forEach(function(movie) {
            //         if (movie.status !== 'returned') {
            //             count++;
            //             activeArray.push(movie);
            //         }
            //     })
            //     return activeArray;
            // }
         
            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user
                }).then(user => {
                    if(user) {
                        console.log(user);
                        MovieQueueFactory.fetch(scope.user._id)
                            .then(movies => {

                                //scope.chachedMoviequeue = activeMovies(movies)
                                scope.chachedMoviequeue = movies
                                // console.log('Queue', scope.moviequeue);
                            })
                        
                    }
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