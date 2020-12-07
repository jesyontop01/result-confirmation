
angular
  .module('verifier')
  .config(function ($routeProvider, $locationProvider) {
		// body...
	$routeProvider
    		.when('/home',{
    			templateUrl: "views/home.html",
    			controller: "DashboardController"
    		})

    		.when('/', {
    			templateUrl: "views/home.html",
    			controller: "DashboardController"
    		})

  		.when('/sign_in', {
          templateUrl: 'views/user_sessions/new.html',
          controller: 'UserSessionsCtrl',
          controllerAs: 'sessions',
          authenticated: false
        })
      .when('/log_in', {
          templateUrl: 'views/user_sessions/logUser.html',
          controller: 'UserSessionsCtrl',
          controllerAs: 'sessions',
          authenticated: false
        })

        .when('/sign_Up', {
          templateUrl: 'views/user_registrations/new.html',
          controller: 'UserRegistrationsCtrl',
          authenticated: false
        })
        .when('/account_update', {
          templateUrl: 'views/user_registrations/edit.html',
          controller: 'UserRegistrationsCtrl',
          authenticated: true
        })
        .when('/passwords/new',{
            templateUrl:"views/user_passwords/new.html",
          controller: "UserPasswordsController",
          authenticated: false
          })
        .when('/passwords/edit',{
            templateUrl:"views/user_passwords/edit.html",
          controller: "UserPasswordsController",
          authenticated: false,
           permission: ['admin']
          })

        .when('/search',{
            templateUrl:"views/confirmations/confirm_search.html",
          controller: "ConfirmationsController",
          authenticated: true
          })

        .when('/search/:CandNo',{
            templateUrl:"views/confirmations/result_view.html",
          controller: "ConfirmationsController",
          authenticated: true
          })
        .when('/address/:CandNo',{
            templateUrl:"views/confirmations/confirm_address.html",
          controller: "ConfirmationsController",
          authenticated: true
          })

        .when('/confirmations',{
            templateUrl:"views/confirmations/confirmations.html",
          controller: "ConfirmationsController",
          authenticated: true
          })
        .when('/wes_upload/:id',{
            templateUrl:"views/confirmations/wes_connection.html",
          controller: "ConfirmationsController",
          authenticated: true
          })
       
        .when('/users',{
          templateUrl:"views/users/index.html",
          controller: "UsersController",
          authenticated: true
             })
        .when('/users/:id', {
          templateUrl: "views/users/show.html",
          controller: "UsersController",
          authenticated: true
        })

        .when('/users/:id/edit',{
            templateUrl:"views/users/edit.html",
          controller: "UsersController",
          authenticated: true
          })
        .when('/audit/new',{
            templateUrl:"views/audit/log_booklet.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff']
          })
        .when('/audit/edit',{
            templateUrl:"views/audit/receipt_status.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff']
          })
        .when('/audit/search',{
            templateUrl:"views/audit/search.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff']
          })
        .when('/audit/payment/:ExamYear/:CandNo',{
            templateUrl:"views/audit/payment.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff']
          })
        .when('/audit/payments',{
            templateUrl:"views/audit/payment_Trans.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff'],
          })
        .when('/audit/All-Payments',{
          templateUrl: "views/audit/All_Payment_Transactions.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff'],
        })
        .when('/verifer/payments',{
            templateUrl: "views/confirmPayment/payments.html",
            controller: "ConfirmPaymentController",
          authenticated: true
          })
        .when('/verifer/:YearName/:exam_no',{
            templateUrl: "views/confirmPayment/result_view.html",       
            controller: "ConfirmPaymentController",
          authenticated: true
          })
        .when('/verifer/address/:ExamYear/:CandNo',{
            templateUrl: "views/confirmPayment/confirm_address.html",       
            controller: "ConfirmPaymentController",
          authenticated: true
          })
        .when('/management',{
            templateUrl: "views/management/management.html",       
            controller: "managementCtrl",
            controllerAs: "management",
            authenticated: true,
            permission: ['admin', 'Management_Staff', 'audit_admin']
            //permission: ['moderator', 'account_staff']
          })

      .otherwise({
        redirectTo: '/home'
      });

      //$locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)

	});


angular
  .module('verifier')
  .run(['$rootScope','Auth', '$location','User', function($rootScope, Auth, $location, User) {
    // body...
      $rootScope.$on('$routeChangeStart', function (event, next, current){
        console.log(next.$$route);
         // Only perform if user visited a route listed above
        if (next.$$route !== undefined) {
           // Check if authentication is required on route
          if (next.$$route.authenticated == true) {
            console.log("Needs authentication");
            // Check if authentication is required, then if permission is required
            if (!Auth.isAuthenticated()) {
              event.preventDefault(); // If not logged in, prevent accessing route
              $location.path('/'); // Redirect to home instead
            }
            else if (next.$$route.permission) {

              Auth.currentUser().then(function(user) {
                // body...
                $rootScope.user = user;

                              if (user) {
                  User.getPermission().then(function (response) {
                // body...
                //console.log(response.data);
                var userPermissions = response.data;
                //console.log(userPermissions);

                function check(){
                  var contains = false;
                  for(var i = 0; i < userPermissions.length; i++){
                     //console.log(userPermissions[i].name);

                     if(next.$$route.permission.includes(userPermissions[i].name)){

                       return true;
                      }//else{
                     //         event.preventDefault(); // If not logged in, prevent accessing route
                     //         $location.path('/'); // Redirect to home instead
                     // }
                  }
                  event.preventDefault(); // If not logged in, prevent accessing route
                  $location.path('/'); // Redirect to home instead

                 return false;
                }

                console.log(check());

              });
              }
              
              })

            }
          } else if(next.$$route.authenticated == false) {
            console.log("Doesn't need authentication");

              if (Auth.isAuthenticated()) {
                event.preventDefault();
                $location.path('#/users/{{user.id}}');
              }
          }
        }
      })
  }]);


       // $rootScope.$on('$routeChangeStart', function () {
       //      if (Auth.isAuthenticated()) {
       //        console.log('Success: User is logged in');
       //        Auth.currentUser().then(function (user){
       //          $rootScope.user = user;
       //          $rootScope.currentUser = user;
       //              vm.isLoggedIn = true;
       //              vm.username = user.surname;
       //              vm.email = user.email;
       //              vm.loadme = true;
       //              console.log(user);

       //        });

       //      } else {
       //          console.log('Failure: User is Not logged in');
       //          vm.isLoggedIn = false;
       //          vm.surname ='';
       //      }
       //    });


              // User.getUserPermission().then(function(response) {
              //   // body...
              //   var userPermissions = response.data;
              //   console.log(userPermissions);
              //   //debugger
              //   if (next.$$route.permission[0] !== userPermissions.permission) {
              //       if (next.$$route.permission[1] !== userPermissions.permission) {
              //                       event.preventDefault(); // If not logged in, prevent accessing route
              //                       $location.path('/'); // Redirect to home instead
              //       }
              //   } 
              // });