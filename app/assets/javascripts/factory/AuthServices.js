
angular.module('verifier')
.factory('AuthServices', function($resource, $rootScope, $q, Auth){
     
    /**
     *  User profile resource
     */
    var Profile = $resource('/api/profile', {}, {
        login: {
            method: "POST",
            isArray : false
        }
    });
     
    var auth = {};
     
    /**
     *  Saves the current user in the root scope
     *  Call this in the app run() method
     */
    auth.init = function(){
        if (Auth.isAuthenticated){
            $rootScope.user = Auth.currentUser();
        }
    };
         
    auth.login = function(username, password){
        return $q(function(resolve, reject){
            Profile.login({username:username, password:password}).$promise
            .then(function(data) {                        
                $sessionStorage.user = data;    
                $rootScope.user = $sessionStorage.user;
                resolve();
            }, function() {
                reject();
            });
        });
    };
     
 
    auth.logout = function() {
        delete $sessionStorage.user;
        delete $rootScope.user;
    };
     
     
    auth.checkPermissionForView = function(view) {
        if (!view.requiresAuthentication) {
            return true;
        }
         
        return userHasPermissionForView(view);
    };
     
     
    var userHasPermissionForView = function(view){
        if(!Auth.isLoggedIn()){
            return false;
        }
         
        if(!view.permissions || !view.permissions.length){
            return true;
        }
         
        return auth.userHasPermission(view.permissions);
    };
     
     
    auth.userHasPermission = function(permissions){
        if(!auth.isLoggedIn()){
            return false;
        }
         
        var found = false;
        angular.forEach(permissions, function(permission, index){
            if ($sessionStorage.user.user_permissions.indexOf(permission) >= 0){
                found = true;
                return;
            }                        
        });
         
        return found;
    };
     
     
    auth.currentUser = function(){
        return $sessionStorage.user;
    };
     
     
    auth.isLoggedIn = function(){
        return $sessionStorage.user != null;
    };
     
 
    return auth;
});