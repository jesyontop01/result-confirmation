angular
  .module('verifier')
  .controller('NavCtrl', function($scope, Auth, $rootScope, $location){
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;
    //$scope.AuditIn = Auth.isAuthenticated && ;
    $rootScope.currentUser={};
    Auth.currentUser().then(function (user){
      $rootScope.user = user;
      $rootScope.currentUser = user;

    });

    $scope.$on('devise:new-registration', function (e, user){
     
       $scope.logout = Auth.logout;
        $location.path("/sign_in");
    });

    $scope.$on('devise:login', function (e, currentUser){
      //console.log(Auth._currentUser.admin);
     $rootScope.currentUser = Auth._currentUser;
      
    });

    $scope.$on('devise:logout', function (e, currentUser){
      alert("You have been logged out.")
      $rootScope.user = undefined
      $location.path('/');
    });


    $scope.$on('permissionsChanged', function (e, permissionlist){
      //console.log(Auth._currentUser.admin);
     $rootScope.permissions = permissionlist;
      
    });
    //console.log(permissions.getPermissions());



    $scope.AuditIn = function() {
      // body...
      $scope.user = {};
    Auth.currentUser().then(function (user){
      $rootScope.user = user;
      $rootScope.currentUser = user;
     return currentUser.audit_role = true;
    });
        if ($rootScope.user && user.audit_role) {
          return true
        }

    }


  });