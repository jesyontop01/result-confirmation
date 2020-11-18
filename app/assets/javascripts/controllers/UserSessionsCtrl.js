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
  .controller('UserSessionsCtrl', ['$scope', 'Auth','$rootScope', 'UserService','$location','$http', '$window',
         function ($scope, Auth, $rootScope, UserService, $location, $http, $window) {
 
        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

        // if (!Auth.isAuthenticated()) {
        //   console.log('Failure: User is Not logged in');
        //   //$scope.logout = Auth.logout();
        // } else {
        //     console.log('Success: User is logged in');
        //     $scope.signedIn = Auth.isAuthenticated();
        // };

              // Catch unauthorized requests and recover.
              $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
                // Disable interceptor on _this_ login request,
                // so that it too isn't caught by the interceptor
                // on a failed login.
                var config = {
                    interceptAuth: false
                };
    
                // Ask user for login credentials
                Auth.login(credentials, config).then(function() {
                    // Successfully logged in.
                    // Redo the original request.
                    return $http(xhr.config);
                }).then(function(response) {
                    // Successfully recovered from unauthorized error.
                    // Resolve the original request's promise.
                    deferred.resolve(response);
                }, function(error) {
                    // There was an error logging in.
                    // Reject the original request's promise.
                    deferred.reject(error);
                });
            });
    
            // // Request requires authorization
            // // Will cause a `401 Unauthorized` response,
            // // that will be recovered by our listener above.
            // $http.delete('/users/1', {
            //     interceptAuth: true
            // }).then(function(response) {
            //     // Deleted user 1
            // }, function(error) {
            //     // Something went wrong.
            // });

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
       $window.localStorage.removeItem('signatory2');
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

    var signatory2 = [];
     signatory2 = $window.localStorage.getItem('signatory2');
     console.log(signatory2);
     


    $scope.submitLogUser  = function(logUserForm) {
      // body...
      console.log(logUserForm);
      $http.get('/users/second_signatory.json',{"params": { "email": logUserForm.email, "password": logUserForm.password}})
        .then(function(response) {
          // body...
         console.log(response.data);
      
          $scope.second_signatory2 = response.data;
         $window.localStorage.setItem('signatory2', JSON.stringify( $scope.second_signatory2));
         $location.path('/');
        }, function(response) {
          // body...
        })
    }




    
  }]);
