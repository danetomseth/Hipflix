app.directive('pageLoader', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {
			var image = new Image();
			image.onload = function() {
				element.addClass('body-background')
				scope.loader = false;
			}
			image.src = "03AG.jpg";
			scope.loader = true;
		}
	}
});