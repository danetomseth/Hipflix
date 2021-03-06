'use strict';
window.app = angular.module('Hipflix', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.when('/auth/:provider', function () {
        window.location.reload();
    });
    $urlRouterProvider.otherwise('/');
});

// create a filter for finding movies of a specific category
app.filter("moviesByCategory", function(){
    return function(movies, category) {
        // console.log('movies',movies)
        // console.log('category',category)
        var filtered = [];
        angular.forEach(movies, function(movie){
            if(movie.category.indexOf(category)> -1){
                filtered.push(movie)
            }
        })
        return filtered
    }
})

app.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(false);
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state, EnvironmentFactory) {
    EnvironmentFactory.getEnvironment()
    .then( isProduction => {
        if(isProduction){
            console.log = function(){};
        }
    });
    // The given state requires an authenticated user.
    const destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

});
