app.directive('hfQueueWindow', function(MovieQueueFactory, $uibModal) {
	return {
		restrict: 'E',
		scope: '=',
		templateUrl: 'js/common/directives/modal/modal-btn.html',
		link: function(scope, element, attrs) {
			scope.showWindow = function() {
				var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'js/common/directives/modal/modal.html',
                    scope: scope,
                    controller: 'MovieQueueCtrl'
                });
			}
		}
	}
});