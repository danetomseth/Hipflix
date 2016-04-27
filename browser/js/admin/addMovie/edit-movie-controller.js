core.controller('EditMovieCtrl', function($scope, $state, MovieFactory, CategoriesFactory, $uibModal) {

	


	MovieFactory.fetchAll()
	.then(function(res) {
		console.log('res fetch all', res);
		$scope.movies = res
	});

	CategoriesFactory.fetchAll()
	.then((categories) => {
		$scope.categories = categories;
	});

	$scope.editMovie = function(movie) {
		$scope.movie = movie
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/js/admin/addmovie/edit-window.html',
			controller: 'EditMovieCtrl',
			scope: $scope,
			resolve: {
				movie: function() {
					$scope.localCategories = $scope.categories
					//used to pre-set selected value for categories in edit window
					//this pre-fills the checkbox for the current movies category
					$scope.movie.category.forEach(function(cat) {
						$scope.localCategories.forEach(function(elem) {
							if(elem.name === cat.name) {
								elem.selected = true;
							}
						})

					})
					return $scope.movie;
				}
			}
		});
		$scope.globalModal = modalInstance;
	}

	$scope.addInv = function() {
		$scope.movie.inventory++;
	}
	$scope.minusInv = function() {
		$scope.movie.inventory--;
	}

	$scope.updateMovie = function(movie, categories) {
		var newCat = [];
		//categories is passed from the modal category ng-model
		//need to filter for categories.selected === true and push id onto movie
		categories.forEach(function(cat) {
			if(cat.selected){
				newCat.push(cat._id)
			}
		})
		movie.category = newCat;
		MovieFactory.updateMovie(movie)
		.then(res => {
			//close edit window and reload state after save
			$scope.globalModal.close();
			$state.reload();

		})

	}


})
