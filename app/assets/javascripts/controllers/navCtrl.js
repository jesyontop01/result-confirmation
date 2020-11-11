angular
  .module('verifier')
  // // Intercepts every http request.  If the response is success, pass it through.  If the response is an
  // // error, and that error is 401 (unauthorised) then the user isn't logged in, redirect to the login page 
  //   .config(['$httpProvider', function($httpProvider){
  //       $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

  //       var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
  //           function success(response) {
  //               return response
  //           };

  //           function error(response) {
  //               if (response.status == 401) {
  //                   $rootScope.$broadcast('event:unauthorized');
  //                   $location.path('/sign_in');
  //                   return response;
  //               };
  //               return $q.reject(response);
  //           };

  //           return function(promise) {
  //               return promise.then(success, error);
  //           };
  //       }];
  //         $httpProvider.interceptors.push(interceptor);
  // }])

//     .config(function($httpProvider){
//   // Intercepts every http request.  If the response is success, pass it through.  If the response is an
//   // error, and that error is 401 (unauthorised) then the user isn't logged in, redirect to the login page 
//   var interceptor = function($q, $location, $rootScope) {
//     return {
//       'responseError': function(rejection) {
//         if (rejection.status == 401) {
//           $rootScope.$broadcast('event:unauthorized');
//           $location.path('/sign_in');        
//           return rejection;
//         }
//         return $q.reject(rejection);        
//       }
//     };
//   };
//   $httpProvider.interceptors.push(interceptor);
// })

 // .config(function(AuthInterceptProvider) {
 //        // Intercept 401 Unauthorized everywhere
 //        AuthInterceptProvider.interceptAuth(true);
 //    })


    // Navigation controller
  .controller('NavCtrl', function($scope, Auth, $rootScope, $location){
    $scope.signedIn = Auth.isAuthenticated;
    $scope.logout = Auth.logout;
    //$scope.AuditIn = Auth.isAuthenticated && ;
    $rootScope.currentUser={};

   Auth.currentUser().then(function (user){
      $rootScope.user = user
    });

    $scope.$on('devise:new-registration', function (e, user){
     
       $scope.logout = Auth.logout;
        $location.path("/sign_in");
    });

    $scope.$on('devise:login', function (e, user){
      $rootScope.user = user
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