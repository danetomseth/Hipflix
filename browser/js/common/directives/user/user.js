app.directive('userItem', function($uibModal, AdminFactory) {
	return {
		restrict: 'E',

		templateUrl: 'js/common/directives/user/user-item-template.html',
		link: function(scope, elem, attr) {

			scope.editUser = function(user) {
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'js/common/directives/user/user-window.html',
					controller: 'EditUserCtrl',
					scope: scope
				});
			}

		}
	}
});

core.controller('EditUserCtrl', function($scope, $state, AdminFactory) {
	$scope.saveUser = function(user) {
		AdminFactory.updateUser($scope.user)
		.then(function(res) {
			$state.reload()
		})
	}
})
