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
    'Devise',
    'oitozero.ngSweetAlert',
    'sessionsController',
    'managementController',
    'userServices',
    'RolesCtrl',
    'RoleService',
    'TransactionTypeServices',
    'TransactionController',
    'WebClientServices',
    'WebServicesController',
    'dataGrid', 'pagination',
    'ui.bootstrap',
    'datatables',
    'userPersistenceService'
   ])
    .config(function(AuthInterceptProvider) {
        // Intercept 401 Unauthorized everywhere
        AuthInterceptProvider.interceptAuth(true);
    })

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
// })
//

//     .config(['$httpProvider', function($httpProvider){
//         $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
// debugger
//         var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
//             function success(response) {
//                 return response
//             };

//             function error(response) {
//                 if (response.status == 401) {
//                     $rootScope.$broadcast('event:unauthorized');
//                     //$location.path('/users/login');
//                        $location.path('/sign_in'); 
//                     return response;
//                 };
//                 return $q.reject(response);
//             };

//             return function(promise) {
//                 return promise.then(success, error);
//             };
//         }];
//           $httpProvider.interceptors.push(interceptor);
//   }])

     .filter('sumOfValue', function() {
        return function(data, key) {
          //debugger;
          if (angular.isUndefined(data) || angular.isUndefined(key))
            return 0;
          var sum = 0;

          angular.forEach(data, function(v, k) {
            //sum = sum + parseInt(v[key]);
            sum = sum + parseFloat(v[key]);
          });
          return sum;
        }
      })
  


  }())
