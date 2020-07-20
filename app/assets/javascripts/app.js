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
  .config(function(AuthProvider) {
        // Configure Auth service with AuthProvider
    });
    


  }())
