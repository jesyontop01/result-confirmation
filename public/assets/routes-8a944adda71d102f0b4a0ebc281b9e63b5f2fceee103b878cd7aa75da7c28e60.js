
angular
  .module('verifier')
  .config(function ($routeProvider, $locationProvider) {
		// body...
	$routeProvider
    		.when('/home',{
    			templateUrl: "views/home.html",
    			controller: "DashboardController",
          authenticated: false
    		})

    		.when('/', {
    			templateUrl: "views/home.html",
    			controller: "DashboardController",
          authenticated: false
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
          authenticated: false
          })

        .when('/search',{
            templateUrl:"views/confirmations/confirm_search.html",
          controller: "ConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })

        .when('/search/:CandNo',{
            templateUrl:"views/confirmations/result_view.html",
          controller: "ConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })
        .when('/address/:CandNo',{
            templateUrl:"views/confirmations/confirm_address.html",
          controller: "ConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })

        .when('/confirmations',{
            templateUrl:"views/confirmations/confirmations.html",
          controller: "ConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })
        .when('/confirmations/Details/:id',{
            templateUrl:"views/confirmations/confirmations_details.html",
          controller: "ConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })

        .when('/webServices/:id',{
            templateUrl:"views/confirmations/webServices.html",
          controller: "ConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })

        .when('/wes_upload/:id',{
            templateUrl:"views/confirmations/wes_connection.html",
          controller: "ConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })

        //Using ResultConfirationController

        .when('/result/search',{
          templateUrl:"views/resultConfirmations/confirm_search.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })
        .when('/result/certifcateEnquiry',{
          templateUrl:"views/resultConfirmations/confirm_searchCertificate.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })
        .when('/result/local_confirmation',{
          templateUrl:"views/resultConfirmations/confirm_local_address.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })
         .when('/result/name_search',{
          templateUrl:"views/resultConfirmations/confirm_name_search.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })

        .when('/result/search/:examYear/:examNo',{
            templateUrl:"views/resultConfirmations/result_view.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })
        .when('/result/address/:examYear/:examNo',{
            templateUrl:"views/resultConfirmations/confirm_address.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', "exam_management","exam_national"]
          })

        .when('/result/confirmations',{
            templateUrl:"views/resultConfirmations/confirmations.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })
        .when('/result/confirmations/Details/:id',{
            templateUrl:"views/resultConfirmations/confirmations_details.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })

        .when('/result/webServices/:id',{
            templateUrl:"views/resultConfirmations/webServices.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })

        .when('/result/wes_upload/:id',{
            templateUrl:"views/resultConfirmations/wes_connection.html",
          controller: "ResultConfirmationsController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })

        //End of ResultConfirmation..............

       
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
        .when('/signature',{
          templateUrl:"views/users/signature.html",
          controller: "UsersController",
          authenticated: true
          })
        .when('/audit/new',{
            templateUrl:"views/audit/log_booklet.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff' , 'account_staff']
          })
        .when('/audit/edit',{
            templateUrl:"views/audit/receipt_status.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff', 'account_staff']
          })
        .when('/audit/search',{
            templateUrl:"views/audit/search.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff', 'account_staff']
          })
        .when('/audit/payment/:ExamYear/:CandNo',{
            templateUrl:"views/audit/payment.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff' , 'account_staff']
          })
        .when('/audit/payments',{
            templateUrl:"views/audit/payment_Trans.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_admin', 'audit_staff', 'account_staff'],
          })
        .when('/audit/All-Payments',{
          templateUrl: "views/audit/All_Payment_Transactions.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_staff', 'account_staff', 'exam_management','exam_national'],
        })
        
        .when('/audit/Audit_All-Payments',{
          templateUrl: "views/audit/audit_all_payment_trans.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_staff', 'account_staff'],
        })
        .when('/audit/Audit_Payments_view',{
          templateUrl: "views/audit/All_Payments.html",
          controller: "AuditsController",
          authenticated: true,
          permission: ['admin', 'audit_staff', 'account_staff'],
        })
        .when('/verifer/payments',{
            templateUrl: "views/confirmPayment/payments.html",
            controller: "ConfirmPaymentController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national'],
          })
        .when('/verifer/search',{
            templateUrl: "views/confirmPayment/confirm_search.html",       
            controller: "ConfirmPaymentController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })
        .when('/verifer/search/:examYear/:candNo',{
            templateUrl: "views/confirmPayment/result_detailed_view.html",       
            controller: "ConfirmPaymentController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })
        .when('/verifer/address/:ExamYear/:CandNo',{
            templateUrl: "views/confirmPayment/confirm_address.html",       
            controller: "ConfirmPaymentController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })
        .when('/packingList',{
            templateUrl: "views/packingList/packList.html",       
            controller: "PackingListController",
          authenticated: true,
          permission: ['admin', 'exam_management','exam_national']
          })
        .when('/management',{
            templateUrl: "views/management/management.html",       
            controller: "managementCtrl",
            controllerAs: "management",
            authenticated: true,
            permission: ['admin']
            //permission: ['moderator', 'account_staff']
          })

      .otherwise({
        redirectTo: '/home'
      });

      //$locationProvider.html5Mode({ enabled: true, requireBase: false }); // Required to remove AngularJS hash from URL (no base is required in index file)

	});


angular
  .module('verifier')
  .run(['$rootScope','Auth', '$location','User','$cookieStore', function($rootScope, Auth, $location, User, $cookieStore) {
    // body...
    
      $rootScope.$on('$routeChangeStart', function (event, next, current, xhr){
        console.log(next.$$route);

            // Disable interceptor on _this_ login request,
            // so that it too isn't caught by the interceptor
            // on a failed login.
            var config = {
                interceptAuth: false
            };
      
         // Only perform if user visited a route listed above
        if (next.$$route !== undefined) {
           // Check if authentication is required on route
          if (next.$$route.authenticated == true) {
            console.log("Needs authentication");
            // Check if authentication is required, then if permission is required
            //debugger
            //if (!Auth.isAuthenticated()) {
              if($cookieStore.get('logged_in') == false){
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
          } 
          else 
            if(next.$$route.authenticated == false) {
            console.log("Doesn't need authentication");
            //debugger
              //if (Auth.isAuthenticated()) {
              if($cookieStore.get('logged_in') != true){
              
                $location.path(next.$$route.originalPath);
             
                interceptAuth =  false;
              }
              else{
                //return true;
                 event.preventDefault();
                $location.path('#/users/{{user.id}}');
               
              }
          }

        }



          // if (next.$$route.originalPath == '/') {

          //     if (Auth.isAuthenticated()) {
          //       $location.path(current.$$route.originalPath);
          //     }
          // }
      });
  }]);
