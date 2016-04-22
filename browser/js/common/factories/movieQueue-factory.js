app.factory('MovieQueueFactory', function($http) {
	return {
		fetch: function(userId) {
			return $http.get('/api/users/' + userId + '/moviequeue')
			.then(function(res) {
				return res.data
			})
		},
		dequeue: function(user, item) {
			return $http.delete('/api/users/'+user._id+'/movie/'+item._id)
			.then(res => res);
		},
		addToQueue: (user, id) => {
			return $http.post('/api/users/'+user._id+'/movie', {movieId: id})
		}
	}
});