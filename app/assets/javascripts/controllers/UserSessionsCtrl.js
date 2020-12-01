 // client/app/scripts/controllers/user_sessions.js

'use strict';

/**
 * @ngdoc function
 * @name fakeLunchHubApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the fakeLunchHubApp
 */
angular.module('sessionsController', [])
  .controller('UserSessionsCtrl', ['$scope', 'Auth','$rootScope', 'User','$location','$http', '$window',
         function ($scope, Auth, $rootScope, User
          , $location, $http, $window) {

           var vm = this;

                   // Loads everytime a new route or view is loaded.....
                vm.isLoggedIn = false;
                vm.loadme = false;
                vm.loading = true;
                vm.errorMsg = false; 
                vm.successMsg = false; 
 
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
          $rootScope.$on('devise:unauthorized', function(event, xhr, deferred) {
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
    

      this.submitLogin = function(loginForm) {
        //vm.logging = true;
        Auth.login($scope.loginForm, config).then(function(user) {
          vm.logging = false;
                  $rootScope.user = user
                  alert("Welcome, " + user.surname);

                vm.successMsg = "Log in is Successful"; 
                  var userPermissions = [];
                 //$rootScope.userPermissions = userPermission.userPermission(user.id);
                 //console.log( $rootScope.userPermissions);
                  $location.path('/');
            console.log(user); // => {id: 1, ect: '...'}
          }, function(error) {
              // Authentication failed...
              vm.logging = false;
              vm.errorMsg = "Invalid username/password";
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


    vm.signedIn = Auth.isAuthenticated;
    vm.logout = Auth.logout;
    //$scope.AuditIn = Auth.isAuthenticated && ;
    $rootScope.currentUser={};
    Auth.currentUser().then(function (user){
      $rootScope.user = user;
      vm.user = user;

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
      $window.localStorage.removeItem('signatory2');
      alert("You have been logged out.")
      $rootScope.user = undefined
      $location.path('/');
    });

    var signatory2 = [];
     signatory2 = $window.localStorage.getItem('signatory2');
     console.log(signatory2);
     


    vm.submitLogUser  = function(logUserForm) {
      // body...
      vm.loading = true;
      console.log(logUserForm);
      $http.get('/users/second_signatory.json',{"params": { "email": logUserForm.email, "password": logUserForm.password}})
        .then(function(response) {
          // body...
           vm.loading = false;
         console.log(response.data);
      
          vm.second_signatory2 = response.data;
         $window.localStorage.setItem('signatory2', JSON.stringify( vm.second_signatory2));
         $location.path('/');
        }, function(response) {
          // body...
        })
    }

        // Loads everytime a new route or view is loaded.....
                vm.isLoggedIn = false;
                vm.loadme = false;
       $rootScope.$on('$routeChangeStart', function () {

        Auth.currentUser().then(function (user) {
          // body...
          console.log(user.roles);
          // console.log(user.roles.map(x=> x.name.indexOf('audit_admin')) )
          // if (user.roles.map(x=> x.name.indexOf('audit_admin')) > -1) {
          //   vm.auditAccess = true;
          // }
          // else
          //   if (user.roles.map(x=> x.name.indexOf('audit_staff')) > -1) {
          //   vm.auditAccess = true; 
          // }

            //           // Find if the array contains an object by comparing the property value
            // if(persons.some(person => person.name === "Peter")){
            //     alert("Object found inside the array.");
            // } else{
            //     alert("Object not found.");
            // }

            // Find if the array contains an object by comparing the property value
              if(user.roles.some(role => role.name === "admin")){
                  console.log(vm.adminAccess = true)
                  vm.adminAccess = true;
                  vm.auditAccess = true;
                  vm.examAccess = true;
              } else if(user.roles.some(role => role.name === "audit_staff")){
                  console.log(vm.auditAccess = true)
                  vm.adminAccess = false;
                  vm.auditAccess = true;
                  vm.examAccess = false;
              } else if(user.roles.some(role => role.name === "exam_staff")){
                  console.log(vm.examAccess = true)
                  vm.adminAccess = false;
                  vm.auditAccess = false;
                  vm.examAccess = true;
              } 

            if (Auth.isAuthenticated() == true) {
              console.log('Success: User is logged in');
              Auth.currentUser().then(function (user){
                $rootScope.user = user;
                $rootScope.currentUser = user;
                    vm.isLoggedIn = true;
                    vm.username = user.surname;
                    vm.email = user.email;
               User.getPermission().then(function (response) {
                // body...
                console.log(response.data);
              //debugger
                for (var i = 0; i < response.data.length; i++) {
      if ( response.data[i].name === 'admin' ||  response.data[i].name === 'Management_Staff' ||  response.data[i].name === 'audit_admin' || response.data[i].name === 'audit_staff'|| response.data[i].name === 'user') {
                    vm.authorized = true
                    vm.loadme = true;

                  }else{
                    vm.loadme = true;
                  }
                }
              });
                    
                    //console.log(user);

              });

            } else {
                console.log('Failure: User is Not logged in');
                vm.isLoggedIn = false;
                vm.surname ='';
            }

        })
 
          });



    
  }]);
