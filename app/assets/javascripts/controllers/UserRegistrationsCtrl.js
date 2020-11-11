  // client/app/scripts/controllers/user_registrations.js

//'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:UserRegistrationsCtrl
 * @description
 * # UserRegistrationsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('verifier')
  
  .controller('UserRegistrationsCtrl', ['$scope', '$location', '$http', 'Auth', '$rootScope', 
              function ($scope, $location, $http, Auth, $rootScope) {
  
       var config = {
              headers: {
                  'X-HTTP-Method-Override': 'POST'
              }
          };
    //:username, :surname, :othernames, :office_id, :is_management, :email, :password, :password_confirmation, :remember_me
     $scope.registerForm = {};
    $scope.handleRegBtnClick = function() {
     
      $scope.registerForm = {
        title:               $scope.registrationForm.title,
        surname:             $scope.registrationForm.surname,
      othernames:            $scope.registrationForm.othernames, 
      lp_no:                  $scope.registrationForm.lp_no,
      office_id:             window.sessionStorage.getItem('officeID'), 
      email:                 $scope.registrationForm.email,
      password:              $scope.registrationForm.password,
      password_confirmation: $scope.registrationForm.password_confirmation,
      is_management:         $scope.registrationForm.is_management  

      };

       console.log($scope.registerForm);

   
      Auth.register($scope.registerForm, config).then(function(user){
        //$rootScope.user = user;
        
        Auth.logout();
        alert("Thanks for signing up, " + user.surname + "\n Your Account Requires Admin Authentication");
        $location.path("/sign_in");
              // Auth.login({
              //     email: $scope.registrationForm.email,
              //     password: $scope.registrationForm.password
              //   }, config);

              }, function(response){
                alert(response.data.error)
              }

          );


          $scope.$on('auth:registration-email-error', function(ev, reason) {
            $scope.error = reason.errors[0];
        });
     }; 

   

    $scope.loadrecord = function () {

      Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            console.log(user); // => {id: 1, ect: '...'}
             $scope.updateAccountForm = user;
        }, function(error) {
            // unauthenticated error
             alert('There was a problem:' + response.status);
        });

    };

    $scope.loadOffices = function() {
      // body...
        $http.get("/offices.json").then(function(response){
          $scope.offices = response.data;
          console.log($scope.offices);
        },function(response){
          alert("There was a problem: " + response.status);
        });
    }

$scope.updateAccountForm = {};

    $scope.updateAccount = function(updateAccountForm) {

      // $scope.updateForm = {
      //   title:               $scope.updateAccountForm.title,
      //   surname:             $scope.updateAccountForm.surname,
      // othernames:            $scope.updateAccountForm.othernames,
      //  lp_no:                $scope.updateAccountForm.lp_no, 
      // office_id:             window.sessionStorage.getItem('officeID'), 
      // email:                 $scope.updateAccountForm.email,
      // current_password:      $scope.updateAccountForm.current_password,
      // password:              $scope.updateAccountForm.password,
      // password_confirmation: $scope.updateAccountForm.password_confirmation,
      // is_management:         $scope.updateAccountForm.is_management  

      // };

      $scope.updateForm = {
      current_password:      $scope.updateAccountForm.current_password,
      password:              $scope.updateAccountForm.password,
      password_confirmation: $scope.updateAccountForm.password_confirmation
       
      };

       console.log($scope.updateForm);

        $http({
                url: 'peoples/'+updateAccountForm.id+'.json', 
                method: 'PUT',
                data: angular.toJson($scope.updateForm) ,
          header: {
            'Content_Type' : 'application/json'
          }
            }).then(function(response){
                      alert('User successfully Updated .');
                      if (response.status == 200) {
                        Auth.logout();
                         $location.path('/');
                       } 
                     
                  },function(response){
                alert('There was a problem:' + response.status);

              }); 

          
    };

      $scope.$on('auth:account-update-success', function(ev) {
              alert("Your account has been successfully updated!");
            });
    }

    ]);