
angular
  .module('verifier')
  .config(function ($routeProvider) {
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
          controller: 'UserSessionsCtrl'
        })

        .when('/sign_Up', {
          templateUrl: 'views/user_registrations/new.html',
          controller: 'UserRegistrationsCtrl'
        })
        .when('/account_update', {
          templateUrl: 'views/user_registrations/edit.html',
          controller: 'UserRegistrationsCtrl'
        })
        .when('/passwords/new',{
            templateUrl:"views/user_passwords/new.html",
          controller: "UserPasswordsController",
          })
        .when('/passwords/edit',{
            templateUrl:"views/user_passwords/edit.html",
          controller: "UserPasswordsController",
          })

        .when('/search',{
            templateUrl:"views/confirmations/confirm_search.html",
          controller: "ConfirmationsController",
          })

        .when('/search/:CandNo',{
            templateUrl:"views/confirmations/result_view.html",
          controller: "ConfirmationsController",
          })
        .when('/address/:CandNo',{
            templateUrl:"views/confirmations/confirm_address.html",
          controller: "ConfirmationsController",
          })

        .when('/confirmations',{
            templateUrl:"views/confirmations/confirmations.html",
          controller: "ConfirmationsController",
          })
        .when('/wes_upload/:id',{
            templateUrl:"views/confirmations/wes_connection.html",
          controller: "ConfirmationsController",
          })
       
        .when('/users',{
          templateUrl:"views/users/index.html",
          controller: "UsersController",
             })
        .when('/users/:id', {
          templateUrl: "views/users/show.html",
          controller: "UsersController",
        })

        .when('/users/:id/edit',{
            templateUrl:"views/users/edit.html",
          controller: "UsersController",
          })
        .when('/audit/new',{
            templateUrl:"views/audit/log_booklet.html",
          controller: "AuditsController",
          })
        .when('/audit/edit',{
            templateUrl:"views/audit/receipt_status.html",
          controller: "AuditsController",
          })
        .when('/audit/search',{
            templateUrl:"views/audit/search.html",
          controller: "AuditsController",
          })
        .when('/audit/payment/:ExamYear/:CandNo',{
            templateUrl:"views/audit/payment.html",
          controller: "AuditsController",
          })
        .when('/verifer/payments',{
            templateUrl: "views/confirmPayment/payments.html",
            controller: "ConfirmPaymentController",
          })
        .when('/verifer/:YearName/:exam_no',{
            templateUrl: "views/confirmPayment/result_view.html",       
            controller: "ConfirmPaymentController",
          })
        .when('/verifer/address/:ExamYear/:CandNo',{
            templateUrl: "views/confirmPayment/confirm_address.html",       
            controller: "ConfirmPaymentController",
          })

      .otherwise({
        redirectTo: '/home'
      });


	});