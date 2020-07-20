 // client/app/scripts/controllers/user_sessions.js

'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('verifier')
  .controller('UserSessionsCtrl', ['$scope', 'Auth','$rootScope', 'UserService','$location',
         function ($scope, Auth, $rootScope, UserService, $location) {
 
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        $scope.submitLogin = function(loginForm) {

        Auth.login($scope.loginForm, config).then(function(user) {
                  $rootScope.user = user
                  alert("Welcome, " + user.surname);
                  $location.path('/');
            console.log(user); // => {id: 1, ect: '...'}
          }, function(error) {
              // Authentication failed...
              console.log(error);
              //alert(error)
              if (error.status == 401) {
                alert("Your Account Needs Authorisation. \nPlease Contact The Admin");
              }
          });

         };

 

        $scope.$on('devise:login', function(event, currentUser) {
            // after a login, a hard refresh, a new tab
           $rootScope.currentUser = currentUser;
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            // user logged in by Auth.login({...})
            $rootScope.currentUser = currentUser;

            console.log($rootScope.currentuser );
        });
    
  }]);
