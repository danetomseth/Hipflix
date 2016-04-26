app.config(function ($stateProvider) {
	$stateProvider.state('admin', {
		url: '/admin',
		controller: 'AdminCtrl',
		templateUrl: 'js/admin/admin-template.html',
		data: {
            authenticate: true
        }
	});
});


core.controller('AdminCtrl', function($scope, $state) {
	$scope.goToPage = function(page) {
		$state.go(page);
	}
});
