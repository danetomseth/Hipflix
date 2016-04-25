app.directive('userItem', function() {
	return {
		restrict: 'E',
		
		templateUrl: 'js/common/directives/user/user-item-template.html',
		link: function(scope, elem, attr) {
			scope.editUser = function(user) {
				console.log('single user', user);
			}
		}
	}
})