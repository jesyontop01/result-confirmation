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


$scope.loading = false;
  $scope.passwordRequestForm = {};
 $scope.submitPwdBtnClick= function() {
    $scope.loading = true;
       var parameters = {
            email: $scope.passwordRequestForm.email
        };
          // body...
          Auth.sendResetPasswordInstructions(parameters).then(function(response) {

            $scope.loading = false;

            //console.log(response);

            // Sended email if user found otherwise email not sended...
            if (response.success == false) {
                alert(response.message)
                $scope.loading = false;
            }else{
                    $scope.loading = false;
                alert("Password Reset Instruction Has being Sent to your "+ 
                                       "supplied email, kindly visit for action");
                $location.path("/");
            }
          });
        };        

        // $scope.$on('devise:send-reset-password-instructions-successfully', function(event) {
        //     // ...
        //     $scope.loading = false;
        //     alert("Password Reset Instruction Has being Sent to your "+ 
        //           "supplied email, kindly visit for action");
        //     $location.path("/");
        // });


        $scope.passwordEditForm = {};

        $scope.submitNewPwdBtnClick = function() {
          // body...
        var parameters = {
            password: $scope.passwordEditForm.password,
            password_confirmation: $scope.passwordEditForm.password_confirmation,
            reset_password_token: $scope.passwordEditForm.reset_password_token
        };

        console.log(parameters);

        Auth.resetPassword(parameters).then(function(new_data) {
            //debugger
            //sconsole.log(new_data); // => {id: 1, ect: '...'}
            if (new_data.success == false) {
                alert("reset_password_token: "+ new_data.message.reset_password_token + "\n"+"Password: "+new_data.message.password );
                $location.path("/password/edit");
            } else {
                alert("Password Changed Successfully");
                $location.path("/sign_in");
            }

        }, function(error) {
            // Reset password failed...
        });

            // $scope.$on('devise:reset-password-successfully', function(event) {
            //     // ...
            //     alert("Password Changed Successfully");
            //     $location.path("/sign_in");
            // });
        }
 
  }]);
