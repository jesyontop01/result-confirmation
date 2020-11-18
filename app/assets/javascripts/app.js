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

   ])
    // .config(function(AuthInterceptProvider) {
    //     // Intercept 401 Unauthorized everywhere
    //     AuthInterceptProvider.interceptAuth(true);
    // });

//  .config(function($httpProvider){
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
// });


  //   .config(['$httpProvider', function($httpProvider){
  //       $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

  //       var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
  //           function success(response) {
  //               return response
  //           };

  //           function error(response) {
  //               if (response.status == 401) {
  //                   $rootScope.$broadcast('event:unauthorized');
  //                   $location.path('/users/login');
  //                   return response;
  //               };
  //               return $q.reject(response);
  //           };

  //           return function(promise) {
  //               return promise.then(success, error);
  //           };
  //       }];
  //         $httpProvider.interceptors.push(interceptor);
  // }]);


   //, permissionList, roleList;

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
