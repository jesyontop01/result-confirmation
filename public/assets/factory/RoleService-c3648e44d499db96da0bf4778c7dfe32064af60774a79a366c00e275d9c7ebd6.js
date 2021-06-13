angular.module('RoleService', [])
.factory('Role', function ($http) {
	// body...
	
	roleFactory = {};

	roleFactory.getRoles = function () {
		// body...
		return $http.get("/roles.json");
	}

return roleFactory;
	

})
;
