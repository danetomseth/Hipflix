app.controller('EditMovieCtrl', function($scope, $state, MovieFactory, CategoriesFactory, $uibModal) {
	
	//$scope.categoryArray = [];
	//$scope.categories = ['drama', 'action', 'comedy'];
	//$scope.movies = ['hello'];
	var globalModal;
	MovieFactory.fetchAll()
	.then(function(res) {
		console.log('movies returned', res);
		$scope.movies = res
	});

	CategoriesFactory.fetchAll()
	.then((categories) => {
		$scope.categories = categories;
	});

	$scope.editMovie = function(movie) {
		$scope.movie = movie
		console.log('opening', $scope.movie);
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/js/admin/addmovie/edit-window.html',
			controller: 'EditMovieCtrl',
			scope: $scope,
			resolve: {
				movie: function() {
					return $scope.movie;
				}
			}
		});
		globalModal = modalInstance;
	}
	$scope.addInv = function() {
		console.log('add');
		$scope.movie.inventory++;
	}
	$scope.minusInv = function() {
		console.log('minus');
		$scope.movie.inventory--;
	}
	$scope.closeWindow = function() {
		globalModal.close();
	};

	// $scope.updateMovie = function(movie) {
	// 	MovieFactory.updateMovie($scope.newMovie)
	// 	.then((newMovie) => {
	// 		$state.go('admin');
	// 	})
	// }


})
