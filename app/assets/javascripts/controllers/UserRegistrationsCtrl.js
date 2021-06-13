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
  

//Validating the non-existence of email.

        $scope.emailIsValid = "";
        //$scope.registrationForm.IsValid = false;

        $scope.validEmail = function(email) {
          // body...email_validity
          //console.log(email);
          $http.get("/users/email_validity.json", 
               {"params": { "email": email}}
              ).then(function(response){ 
                   //debugger
                  //console.log(response.data);
                  if (response.data.success == true) {
                    $scope.emailIsValid = false;
                    $scope.registrationForm.IsValid = false;
                    //alert(response.data.message);
                    $scope.emailMsg = response.data.message;
                  } else {
                    $scope.emailIsValid = true;
                    $scope.registrationForm.IsValid = true;
                    //alert(response.data.message);
                    $scope.emailMsg = response.data.message;
                    //console.log(response);
                  }
                
                
          },function (response) {
                     alert('Unexpected Error');
                 });
    } 


            $scope.validUsername = function(username) {
          // body...email_validity
          console.log(username);
          $http.get("/users/username_validity.json", 
               {"params": { "username": username}}
              ).then(function(response){ 
                   //debugger
                  //console.log(response.data);
                  if (response.data.success == true) {
                    $scope.usernameIsValid = false;
                    $scope.registrationForm.IsValid = false;
                    //alert(response.data.message);
                    $scope.emailMsg = response.data.message;
                  } else {
                    $scope.usernameIsValid = true;
                    $scope.registrationForm.IsValid = true;
                    //alert(response.data.message);
                    $scope.emailMsg = response.data.message;
                    //console.log(response);
                  }
                
                
          },function (response) {
                     alert('Unexpected Error');
                 });
    }

    $scope.management = {
        "value": true
      };
      // $scope.national = {
      //     "value": true
      // };

//Creating a user registration Object

      $scope.registerForm = {
            title:               "",
            surname:             "",
          othernames:            "", 
          lp_no:                 "",
          office_id:             "", 
          email:                 "",
          password:              "",
          password_confirmation: "",
          is_management:         false,
          dept_id:            ""

        };

        //$scope.registrationForm.staffCategory = false;
    var management = false;
    //var national = false;
//Registration of user on Button Click
    $scope.handleRegBtnClick = function() {
//debugger
console.log( $scope.registrationForm.staffCategory);


    if ($scope.registrationForm.staffCategory == true) {
      //console.log("it is management");
      management = true;
    } else {
      //console.log("it is national");
      management = false;
    }



    console.log( $scope.registrationForm.staffCategory);
      $scope.registerForm = {
        title:               $scope.registrationForm.title,
        surname:             $scope.registrationForm.surname,
      othernames:            $scope.registrationForm.othernames, 
      lp_no:                  $scope.registrationForm.lp_no,
      office_id:             window.sessionStorage.getItem('officeID'), 
      email:                 $scope.registrationForm.email,
      username:              $scope.registrationForm.Username,
      password:              $scope.registrationForm.password,
      password_confirmation: $scope.registrationForm.password_confirmation,
      is_management:         $scope.registrationForm.staffCategory,
      dept_id:               $scope.registrationForm.deptId.id  

      };
  

      console.log($scope.registerForm);

      if ($scope.registrationForm.password == $scope.registrationForm.password_confirmation) {

        Auth.register($scope.registerForm, config).then(function(user){
        //$rootScope.user = user;
        console.log(user);
        if (user.success === true) {
            debugger
            alert("Thanks for signing up, " + user.user.surname + "\n Your Account Requires Admin Authentication");
            Auth.logout();

            $location.path("/sign_in");
        } else {
            alert(user.user);
        }
        
              // Auth.login({
              //     email: $scope.registrationForm.email,
              //     password: $scope.registrationForm.password
              //   }, config);

              }, function(response){
                alert(response.data.error)
              }

          );
   
      } else {
        
        alert("Password do not match");
      }

      


   



        //   $scope.$on('auth:registration-email-error', function(ev, reason) {
        //     $scope.error = reason.errors[0];
        // });
  }



   
//Load user Details for Accout Update.
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


      $scope.diets = [];

  $http.get("/divisions.json").then(function(response){
    $scope.divisions = response.data;
    console.log($scope.divisions);
  },function(response){
    alert("There was a problem: " + response.status);
  });

  $scope.WaecDivisionId = 0;

   $scope.$watch('$scope.registrationForm.WaecDivisionId', function(newValue, oldValue){
    window.sessionStorage.setItem('divisionID', newValue);
    //window.localStorage.setItem('currentMData', newValue);
  })

 $scope.finDepts = null;
 $scope.arPicker = false;

// Get All departments (Actively in use)
 $scope.getDepartments = function () {
   // body...
        $http.get("/departments.json",
          ).then(function(response){ 
      // debugger
            $scope.depts = response.data;
                 console.log(response);
             },function (response) {
                 alert('Unexpected Error');
             });
 }

//Get other attributes for Exam's staff(Actively in use)
  $scope.getExamAttribute = function () {
     var department = $scope.registrationForm.deptId;
console.log($scope.registrationForm.deptId);

  if(department.division_id == 1){
          $scope.arPicker = true;
     }
     else {

         $scope.arPicker = false;
     }
 }

//Get Finance departments on Drop down select OR 
//Get Exam's staff extra Attributes on drop down select on Divisions
 //   $scope.getFinDept = function () {
 //     var divisionId = $scope.registrationForm.WaecDivisionId;


 
 //     if (divisionId == 2) {

 //      $scope.arPicker = false;

 //          $http.get("/finance_depts.json", 
 //           {"params": { "division_id": divisionId}}
 //          ).then(function(response){ 
 //      // debugger
 //            $scope.finDepts = response.data;
 //                 console.log(response);
 //             },function (response) {
 //                 alert('Unexpected Error');
 //             });
 //     }
 //     else if(divisionId == 1){
 //          $scope.arPicker = true;
 //          $scope.depts = null;
 //     }
 //     else {
 //         $scope.depts = null;
 //         $scope.arPicker = true;
 //     }
 // }



$scope.updateAccountForm = {};

    $scope.updateAccount = function(updateAccountForm) {

      // $scope.updateForm = {
      //   title:               $scope.updateAccountForm.title,
      //   surname:             $scope.updateAccountForm.surname,
      // othernames:            $scope.updateAccountForm.othernames,
      //  lp_no:                $scope.updateAccountForm.lp_no, 
      // office_id:             window.sessionStorage.getItem('officeID'), 
      // email:                 $scope.updateAccountForm.email,
      // username:              $scope.updateAccountForm.Username,
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

    ])



// Custom directive to check matching passwords 
.directive('match', function() {
    return {
        restrict: 'A', // Restrict to HTML Attribute
        controller: function($scope) {
            $scope.confirmed = false; // Set matching password to false by default

            // Custom function that checks both inputs against each other               
            $scope.doConfirm = function(values) {
                // Run as a loop to continue check for each value each time key is pressed
                values.forEach(function(ele) {
                    // Check if inputs match and set variable in $scope
                    if ($scope.confirm == ele) {
                        $scope.confirmed = true; // If inputs match
                    } else {
                        $scope.confirmed = false; // If inputs do not match
                    }
                });

            };
        },

        link: function(scope, element, attrs) {

            // Grab the attribute and observe it            
            attrs.$observe('match', function() {
                scope.matches = JSON.parse(attrs.match); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });

            // Grab confirm ng-model and watch it           
            scope.$watch('confirm', function() {
                scope.matches = JSON.parse(attrs.match); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });
        }
    };
});