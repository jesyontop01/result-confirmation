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
          $http.get("/users/email_validity.json", 
               {"params": { "email": email}}
              ).then(function(response){ 
                   //debugger
                  console.log(response.data);
                  if (response.data.success == true) {
                    $scope.emailIsValid = false;
                    $scope.registrationForm.IsValid = false;
                    alert(response.data.message);
                    $scope.emailMsg = response.data.message;
                  } else {
                    $scope.emailIsValid = true;
                    $scope.registrationForm.IsValid = true;
                    alert(response.data.message);
                    $scope.emailMsg = response.data.message;
                    console.log(response);
                  }
                
                
          },function (response) {
                     alert('Unexpected Error');
                 });
    } 

    $scope.management = {
        "value": true
      };
      $scope.national = {
          "value": true
      };

//Creating a user registration Object

      $scope.registerForm = {
            title:               "",
            surname:             "",
          othernames:            "", 
          lp_no:                  "",
          office_id:             "", 
          email:                 "",
          password:              "",
          password_confirmation: "",
          is_management:         false,
          is_national_Staff:      false,
          division_id:            "",
          finance_dept_id:         ""  

          };

//Registration of user on Button Click
    $scope.handleRegBtnClick = function() {
//debugger
console.log($scope.registrationForm.staffCategory);
      if ($scope.registrationForm.staffCategory == "management") {
        $scope.registrationForm.is_management = true;
        $scope.registrationForm.is_national_Staff = false;
      }
      else{
                $scope.registrationForm.is_management = false;
                $scope.registrationForm.is_national_Staff = true;
      }

      //  if($scope.registrationForm.staffCategory.value == $scope.national.value) {
      //           $scope.registrationForm.is_management = false;
      //           $scope.registrationForm.is_national_Staff = true;
      // }
     
      $scope.registerForm = {
        title:               $scope.registrationForm.title,
        surname:             $scope.registrationForm.surname,
      othernames:            $scope.registrationForm.othernames, 
      lp_no:                  $scope.registrationForm.lp_no,
      office_id:             window.sessionStorage.getItem('officeID'), 
      email:                 $scope.registrationForm.email,
      password:              $scope.registrationForm.password,
      password_confirmation: $scope.registrationForm.password_confirmation,
      is_management:         $scope.registrationForm.is_management,
      is_national_Staff:      $scope.registrationForm.is_national_Staff,
      //division_id:            $scope.registrationForm.WaecDivisionId,
      division_id:           $scope.registrationForm.FinDeptId.division.id,
      finance_dept_id:         $scope.registrationForm.FinDeptId.id  

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
 $scope.getFinDepartments = function () {
   // body...
        $http.get("/finance_depts.json",
          ).then(function(response){ 
      // debugger
            $scope.finDepts = response.data;
                 console.log(response);
             },function (response) {
                 alert('Unexpected Error');
             });
 }

//Get other attributes for Exam's staff(Actively in use)
  $scope.getExamAttribute = function () {
     var department = $scope.registrationForm.FinDeptId;
console.log($scope.registrationForm.FinDeptId);

  if(department.division.id == 1){
          $scope.arPicker = true;
     }
     else {

         $scope.arPicker = false;
     }
 }

//Get Finance departments on Drop down select OR 
//Get Exam's staff extra Attributes on drop down select on Divisions
   $scope.getFinDept = function () {
     var divisionId = $scope.registrationForm.WaecDivisionId;


 
     if (divisionId == 2) {

      $scope.arPicker = false;

          $http.get("/finance_depts.json", 
           {"params": { "division_id": divisionId}}
          ).then(function(response){ 
      // debugger
            $scope.finDepts = response.data;
                 console.log(response);
             },function (response) {
                 alert('Unexpected Error');
             });
     }
     else if(divisionId == 1){
          $scope.arPicker = true;
          $scope.finDepts = null;
     }
     else {
         $scope.finDepts = null;
         $scope.arPicker = true;
     }
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