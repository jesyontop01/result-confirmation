//Save the permission list passed to it to an in memory variable
    //Broadcast an event that will be listened by our custom directive to re-render it if the permissions changed
//permissions.js
angular.module('verifier')
.factory('permissions', function($rootScope) {
  var permissionList = [];
  return {
    setPermissions: function(permissions) {
      permissionList = permissions;
      $rootScope.$broadcast('permissionsChanged');
    },

    setRoles: function(roles) {
     roleList = roles;
      $rootScope.$broadcast('permissionsChanged');
    },

    getPermissions: function() {
    return  permissionList;
      $rootScope.$broadcast('permissionsChanged');
    },
    
    // userPermission: function(id) {
    // 	// body...
    // 	for (var i = 1; i < permissionList.length; i++) {
    // 		permissionList[i].user_id = id;
    // 		return permissionList;
    // 	};

    // }

    hasPermission: function (permission) {
      permission = permission.trim();
      return permissionList.some(item => {
        if (typeof item.Name !== 'string') { // item.Name is only used because when I called setPermission, I had a Name property
          return false;
        }
        return item.Name.trim() === permission;
      });
    }
  };
});