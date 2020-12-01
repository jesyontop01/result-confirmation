angular.module('userServices', [])
.factory('User', function($http) {
	// body...
	var userFactory = {};

	   userFactory.create = function(regData) {
       return $http.post('/api/users', regData);
   };

      userFactory.getPermission = function() {
       return $http.get('/assignments/user_permissions.json');
   };

    userFactory.getUserPermission = function() {
       return $http.get('/users/user_permissions.json');
   };

     userFactory.getUsers = function() {
       return $http.get('/users.json');
   };


	return userFactory;
});