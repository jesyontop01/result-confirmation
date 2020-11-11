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
                  var userPermissions = [];
                 //$rootScope.userPermissions = userPermission.userPermission(user.id);
                 //console.log( $rootScope.userPermissions);
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

        });


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

    
  }]);
