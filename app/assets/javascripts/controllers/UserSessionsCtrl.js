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
  .controller('UserSessionsCtrl', ['$scope', 'Auth','$rootScope', 'User','$location',
              '$http', '$window','userSession', '$route', '$cookies', '$cookieStore', 'SweetAlert',
         function ($scope, Auth, $rootScope, User, $location, $http, $window, userSession, 
                    $route, $cookies, $cookieStore, SweetAlert) {

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

                var credentials = {
                  email: "",
                  password: ""
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
                    if (error.status == 401) {
                        $rootScope.$broadcast('event:unauthorized');

                          // Removing frontend static session
                            if ($cookieStore.get('logged_in') == true ) {
                               $cookieStore.remove('logged_in'); 
                            }
                          $rootScope.user.id = null;

                        $location.path('/sign_in'); 
                        return error;
                    };

                    deferred.reject(error);

                });
            });



      // this.submitLogin = function(loginForm) {
      //   //vm.logging = true;
      //   Auth.login($scope.loginForm, config).then(function(user) {
      //     vm.logging = false;

      // if( userSession.getCookieData() != null) {

      //         vm.second_signatory = [];

      //         var encodedString = atob(userSession.getCookieData()); 
      //             //console.log( JSON.parse(encodedString));
      //         vm.usrSecond = JSON.parse(encodedString) ;
      //         vm.userID = vm.usrSecond.userID;

      //         $http.get("/users/get_SecondUser",{"params": { "email": vm.userID}} ).then(function(response){
      //         vm.secondUser = response.data.secondUser;
      //   debugger
      //                 console.log(vm.secondUser);
      //         if (vm.secondUser.office_id != user.office_id) {
      //           alert("Sorry!, users from different offices detected.\n And so, You will be logged out. Thanks");
      //            Auth.logout;
      //           $rootScope.user = undefined
      //           //$location.path("/sign_in");
      //           $location.path('/');
      //         } else {

      //             $rootScope.user = user
      //                 alert("Welcome, " + user.surname);
      //                 vm.successMsg = "Log in is Successful"; 
      //                 var userPermissions = [];
      //                        //$rootScope.userPermissions = userPermission.userPermission(user.id);
      //                        //console.log( $rootScope.userPermissions);
      //               if (user.signature == null) {
      //                   alert("Please upload your Signature Before You Continue. \n Thanks.");
      //                   $location.path('/signature');
      //                 }
      //                 else  {
      //                       $location.path('/');
                                
      //               }
                              
      //                 //console.log(user);

      //                         }
      //               })

      //   } else {
      //       $rootScope.user = user
      //             alert("Welcome, " + user.surname);
      //           vm.successMsg = "Log in is Successful"; 
      //             var userPermissions = [];
      //            //$rootScope.userPermissions = userPermission.userPermission(user.id);
      //            //console.log( $rootScope.userPermissions);
      //       if (user.signature == null) {
      //         alert("Please upload your Signature Before You Continue. \n Thanks.");
      //             $location.path('/signature');
      //            }
      //            else  {
      //           $location.path('/');
                
      //       }
                  
      //       console.log(user); // => {id: 1, ect: '...'}
      //     }
      

      //     }, function(error) {
      //         // Authentication failed...
      //         vm.logging = false;
      //         vm.errorMsg = "Invalid username/password";
      //         console.log(error);
      //         //alert(error)
      //         if (error.status == 401) {
      //           alert("Your Account Needs Authorisation. \nPlease Contact The Admin");
      //         }

      //     });
      // }





      // this.submitLogin = function(loginForm) {
      //   //vm.logging = true;
      //   Auth.login($scope.loginForm, config).then(function(user) {
      //     vm.logging = false;
      //             $rootScope.user = user
      //             alert("Welcome, " + user.surname);
      //           vm.successMsg = "Log in is Successful"; 
      //             var userPermissions = [];
      //            //$rootScope.userPermissions = userPermission.userPermission(user.id);
      //            //console.log( $rootScope.userPermissions);
      //       if (user.signature == null) {
      //         alert("Please upload your Signature Before You Continue. \n Thanks.");
      //             $location.path('/signature');
      //            }
      //            else  {
      //           $location.path('/');
                
      //         }
                  
      //       console.log(user); // => {id: 1, ect: '...'}
      //     }, function(error) {
      //         // Authentication failed...
      //         vm.logging = false;
      //         vm.errorMsg = "Invalid username/password";
      //         console.log(error);
      //         //alert(error)
      //         if (error.status == 401) {
      //           alert("Your Account Needs Authorisation. \nPlease Contact The Admin");
      //         }

      //     });
      // if( userSession.getCookieData() != null) {

      //         var encodedString = atob(userSession.getCookieData()); 
      //             //console.log( JSON.parse(encodedString));
      //         vm.usrSecond = JSON.parse(encodedString) ;
      //         vm.userID = vm.usrSecond.userID;

      //         $http.get("/users/get_SecondUser",{"params": { "email": vm.userID}} ).then(function(response){
      //         vm.secondUser = response.data.secondUser;
      //   debugger
      //                 console.log(vm.secondUser);
      //         if (vm.secondUser.office_id != user.office_id) {
      //           alert("Sorry!, users from different offices detected.\n And so, You will be logged out. Thanks");
      //            Auth.logout;
      //           $rootScope.user = undefined
      //           //$location.path("/sign_in");
      //           $location.path('/');
      //         }

      //       }); 
      //     }


      //    };


    

      this.submitLogin = function(loginForm) {
        //vm.logging = true;
        Auth.login($scope.loginForm, config).then(function(user) {
          vm.logging = false;
                  $rootScope.user = user
                  //alert("Welcome, " + user.surname);
                  SweetAlert.swal("Successful!", "Welcome, " + user.surname, "success");
                vm.successMsg = "Log in is Successful"; 
                  var userPermissions = [];
                 //$rootScope.userPermissions = userPermission.userPermission(user.id);
                 //console.log( $rootScope.userPermissions);
                      console.log(user.roles);
// $cookieStore.put('logged_in',true);
// $rootScope.logged_in = true;


                      if (user) {
                        //$cookies.put("_isLoggedIn", true); 
                        $cookieStore.put('logged_in',true); 
                        //$rootScope.logged_in = $cookieStore.get('logged_in');                    
                      }
                      else{
                        //$rootScope.isLoggedIn = false;
                        $rootScope.logged_in = false;
                      }

                  $rootScope.logged_in = $cookieStore.get('logged_in'); 
                  console.log( $rootScope.logged_in);

            // Find if the array contains an object by comparing the property value
            // if(user.roles.some(role => role.name === "exam_staff")){
            //       console.log(vm.adminAccess = true)
            //       vm.adminAccess = true;
            //       vm.auditAccess = true;
            //       vm.examAccess = true;
            //       vm.accountAccess = true;
            //   }

            if (user.roles.some(role => role.name === "exam_staff") && (user.signature == null)) {
              alert("Please upload your Signature Before You Continue. \n Thanks.");
                  $location.path('/signature');
                 }
            else  {
                $location.path('/');
                
              }
                  
            //console.log(user); // => {id: 1, ect: '...'}
          }, function(error) {
              // Authentication failed...
              vm.logging = false;
              vm.errorMsg = "Invalid username/password";
              console.log(error);
              //alert(error)
              if (error.status == 401) {
                alert( " Or Your Account Needs Authorisation. \nPlease Contact The Admin");
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
      // $window.localStorage.removeItem('signatory2');
      // $window.localStorage.removeItem('signatoryUser');

      // Removing frontend static session
      if ($cookieStore.get('logged_in') == true ) {
         $cookieStore.remove('logged_in'); 
      }
     
      alert("You have been logged out.")
      $rootScope.user = undefined
      $location.path('/');
    });

  //   this.signatoryLogout2 = function () {
  //     // body...
  //     if ($window.localStorage.getItem('signatoryUser') != null) {
  //           if (confirm("You are about log out signatory 2..?") == true) {
  //             $window.localStorage.removeItem('signatoryUser');
  //             window.location.reload();
  //             $location.path('/');
  //           }
  //           else {
  //             vm.usrSecond = userSession.getCookieData('usr');
  //             console.log(vm.usrSecond);
  //                 alert(" Operation was cancelled ");
  //                 window.location.reload();
  //                $location.path('/');
           
          
  //         }
  //     }
  //     else{
  //       $window.localStorage.getItem('signatoryUser') = null;
      
  //   }
  // }

      this.signatoryLogout = function () {
      // body...
      if (userSession.getCookieData('usr') != null) {
            if (confirm("You are about log out signatory 2..?") == true) {
              userSession.clearCookieData();
              //$route.reload(); // Reload the page 
              window.location.reload();
              $location.path('/');
            }
            else {
              vm.usrSecond = userSession.getCookieData('usr');
              //console.log(vm.usrSecond);
                  alert(" Operation was cancelled ");
                  window.location.reload();
                  $route.reload(); // Reload the page
                 $location.path('/');
           
          
          }
      }
      else{
        userSession.getCookieData() = null;
      
    }
  }

      $scope.closeModalSave = function(){
        var modal_popup = angular.element('#userLogIn');
        modal_popup.modal('hide');
        //$route.reload();
      };


     


     this.submitLogUser  = function(logUserForm) {
      // body...
      vm.loading = true;
      console.log(logUserForm);
      $http.get('/users/second_signatory.json',{"params": { "email": logUserForm.email, "password": logUserForm.password}})
        .then(function(response) {
          // body...
           vm.loading = false;
         //console.log(response.data);
         //vm.second2 = response.data;
   //{signatory2: signatoryUser, logUser: user , success: false }   
          //vm.second2 = JSON.stringify(response.data.signatory2);
          if (response.data.success == false) {
            alert(response.data.message)
            //window.location.reload();
            window.location.reload();
            //$route.reload();//Reload The page
          } 
          else {

              vm.User2 = {
                surname: response.data.logUser.surname,
                othernames: response.data.logUser.othernames
              }

              vm.second2 = {
                surname: response.data.logUser.surname,
                othernames: response.data.logUser.othernames.slice(0,1),
                userID: response.data.logUser.email
              }

              //console.log(vm.User2);
              //console.log(vm.second2);
              var encodedStringBtoA = btoa(JSON.stringify(vm.second2));
              //console.log( encodedStringBtoA);
              //userSession.setCookieData(JSON.stringify(vm.second2));
              userSession.setCookieData(encodedStringBtoA);
               //$cookies.put("usr", user);
             //$window.localStorage.setItem('signatory2', JSON.stringify( vm.second_signatory2));

             //$window.localStorage.setItem('signatoryUser', JSON.stringify( vm.User2));
             alert("Welcome " + response.data.logUser.surname );
             //window.location.reload();
             $scope.closeModalSave();
              //window.location.reload();
             
              //$location.path('#/confirmations');
               $route.reload();
          }


        }, function(response) {
          // body...
        })
    }

    // $scope.SetCookies = function () {
    //             userPersistenceService.setCookieData($scope.username)
    //         };
    //         $scope.GetCookies = function () {
    //             $window.alert(userPersistenceService.getCookieData('username'));
    //         };
    //         $scope.ClearCookies = function () {
    //             userPersistenceService.clearCookieData();
    //         };

        // Loads everytime a new route or view is loaded.....
                vm.isLoggedIn = false;
                vm.loadme = false;
    $rootScope.$on('$routeChangeStart', function () {

      if (userSession.getCookieData() != null) {
        var encodedString = atob(userSession.getCookieData()); 
          //console.log( JSON.parse(encodedString));
                  vm.usrSecond = JSON.parse(encodedString) ;
                  //console.log(vm.usrSecond);
          }

        if ( $cookieStore.get('logged_in') == true) {
        
               $rootScope.logged_in = $cookieStore.get('logged_in');                   
          }
          else{
              $rootScope.logged_in = false;
        }

console.log($rootScope.logged_in);


       

        Auth.currentUser().then(function (user) {
          // body...
          console.log(user.roles);

            // Find if the array contains an object by comparing the property value
              if(user.roles.some(role => role.name === "admin")){
                  console.log(vm.adminAccess = true)
                  vm.adminAccess = true;
                  vm.auditAccess = true;
                  vm.examAccess = true;
                  vm.accountAccess = true;
              } else if(user.roles.some(role => role.name === "account_staff")){
                  console.log(vm.auditAccess = true)
                  vm.adminAccess = false;
                  vm.auditAccess = false;
                  vm.examAccess = false;
                  vm.accountAccess = true;
              } else if(user.roles.some(role => role.name === "audit_staff")){
                  console.log(vm.auditAccess = true)
                  vm.adminAccess = false;
                  vm.auditAccess = true;
                  vm.examAccess = false;
                  vm.accountAccess = false;
              }  else if(user.roles.some(role => role.name === "audit_admin")){
                  console.log(vm.auditAccess = true)
                  vm.adminAccess = false;
                  vm.auditAccess = true;
                  vm.examAccess = false;
                  vm.accountAccess = false;
              } else if(user.roles.some(role => role.name === "exam_staff")){
                  console.log(vm.examAccess = true)
                  if (user.signature == null ) {
                    vm.examAccess = false;
                  } else {
                    vm.examAccess = true;
                  }
                  vm.adminAccess = false;
                  vm.auditAccess = false;
                  //vm.examAccess = true;
                  vm.accountAccess = false;
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

       if ($window.localStorage.getItem('signatoryUser') != null) {
          //console.log($window.localStorage.getItem('signatory2'));
           vm.signatoryUser = {};
            vm.signatoryUser = JSON.parse($window.localStorage.getItem('signatoryUser'));
             console.log(vm.signatoryUser);
                   
           //JSON.parse
         } else {

         }



    
  }]);
