app.config(function($stateProvider) {
	$stateProvider.state('newcategory', {
		url: '/admin/newcategory',
		controller: 'NewCategoryCtrl',
		templateUrl: 'js/admin/newCategory/newCategory-template.html'
	})
});

app.controller('NewCategoryCtrl', function($scope, $state, CategoriesFactory) {
	$scope.addCategory = function(data) {
		var category = {
			name: data
		}
		CategoriesFactory.create(category).then(createdCategory => {
			console.log('created', createdCategory);
			$state.go('admin');
		})
	}
});