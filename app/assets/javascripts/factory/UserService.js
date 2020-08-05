// Example service that holds on to the
// current_user for the lifetime of the app
angular.module('verifier')
.factory('UserService', function($http) {
	var current_user = {};
	var user_id;
	return {
		getCurrentUser: function() {
			// $http.get('users/'+ user_id'.json').then(function(response){
			// 	current_user = response.data;
			// }, function(response){ alert(response.status);
			// 	})
			return current_user;
		},

		// getUser: function(id) {
		// 	$http.get('api/auth/users/'+ id'.json').then(function(response){
		// 		current_user = response.data;
		// 	}, function(response){ alert(response.status);
		// 		})
		// 	return current_user;
		// },
		setCurrentUser: function(user) {
				current_user = user;
			

		}
	}
});
