(function(){
 angular
  .module('verifier', [
    'templates',
  	'ipCookie',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'naif.base64',
    'ng-token-auth',
    'Devise'

   ])//, permissionList, roleList;

  // //app.js
  // //var app = angular.module('myApp', []), permissionList;

  //   app.run(function(permissions) {
  //     permissions.setPermissions(permissionList);
  //   });

  //   app.run(function(permissions) {
  //     permissions.setRoles(roleList);
  //   });

  //   //We want to get all the user permissions before 
  //   //loading our app (more like a resolve but for every route)
  //   angular.element(document).ready(function() {
  //     $.get('/assignments.json', function(data) {
  //       permissionList = data;
  //       console.log(permissionList);
  //       angular.bootstrap(document, ['verifier']);
  //     });
  //     $.get('/roles.json', function(data) {
  //       roleList = data;
  //       console.log(roleList);
  //       //angular.bootstrap(document, ['verifier']);
  //     });
  //   });



  //   app.run(['$rootScope', '$location', 'Auth', 'AuthServices', function (AuthServices, $rootScope, $location, Auth) {
  //   AuthServices.init();
     
  //   $rootScope.$on('$routeChangeStart', function (event, next) {
  //       if (!Auth.checkPermissionForView(next)){
  //           event.preventDefault();
  //           $location.path("/login");
  //       }
  //   });
  // }]);

    //then we will store the permissions (using a service)
    //What we are doing is after getting the permissions returned from the server is 
    //call setPermissions on the permissions service that will do two things:


  // .config(function(AuthProvider) {
  //       // Configure Auth service with AuthProvider
  //   });
    


  }())
