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
  .controller('UserPasswordsController', ['$scope', 'Auth','$rootScope', '$location', '$routeParams',
         function ($scope, Auth, $rootScope,$location, $routeParams) {

        var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };

  $scope.passwordRequestForm = {};
 $scope.submitPwdBtnClick= function() {
       var parameters = {
            email: $scope.passwordRequestForm.email
        };
          // body...
          Auth.sendResetPasswordInstructions(parameters).then(function() {
            // Sended email if user found otherwise email not sended...
          });
        };        

        $scope.$on('devise:send-reset-password-instructions-successfully', function(event) {
            // ...
            alert("Password Reset Instruction Has being Sent to your"+ 
                  "supplied email, kindly visit for action");
            $location.path("/");
        });


        $scope.passwordEditForm = {};

        $scope.submitNewPwdBtnClick = function() {
          // body...
        var parameters = {
            password: $scope.passwordEditForm.password,
            password_confirmation: $scope.passwordEditForm.password_confirmation,
            reset_password_token: $routeParams.resetToken
        };

        console.log(parameters);

        Auth.resetPassword(parameters).then(function(new_data) {
            console.log(new_data); // => {id: 1, ect: '...'}
        }, function(error) {
            // Reset password failed...
        });

        $scope.$on('devise:reset-password-successfully', function(event) {
            // ...
            alert("Password Changed Successfully");
            $location.path("/sign_in");
        });
        }
 
  }]);
