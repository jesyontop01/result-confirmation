angular.module('verifier')
.factory('AuthServices', function($resource, $rootScope, $sessionStorage, $q, Auth){
     
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
    Auth.init = function(){
        if (Auth.isLoggedIn()){
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
     
     
   Auth.checkPermissionForView = function(view) {
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
         
        return Auth.userHasPermission(view.permissions);
    };
     
     
    Auth.userHasPermission = function(permissions){
        if(!Auth.isLoggedIn()){
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
     
     
    Auth.currentUser = function(){
        return $sessionStorage.user;
    };
     
     
    Auth.isLoggedIn = function(){
        return $sessionStorage.user != null;
    };
     
 
    return auth;
});
