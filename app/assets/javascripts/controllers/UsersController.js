angular.module('verifier')
	.controller("UsersController", [ "$scope", "$http", "$location", "crudService", "$routeParams","Auth", "Role",
		function ($scope, $http, $location, crudService, $routeParams, Auth, Role) {


	    	// Return All Confirmations to  View...............

    	$scope.users = [];
    	

		$scope.getAllUsers = function(){

		    		$http({
		    		method: 'GET',
		    		url: '/users.json',
					}).then(function(response){
					    		$scope.users = response.data.users;
					    		console.log($scope.users);
					  						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
				    	};

		//$scope.getAllUsers();

					$scope.offices = [];


					if($scope.users != null){

						$http.get("/offices.json").then(function(response){
							$scope.offices = response.data;
							console.log($scope.offices);
						},function(response){
							alert("There was a problem: " + response.status);	    		
					});	

					   // Return Array of Office Names ........................
//using the returned $scope.offices = []; 
//And $scope.offices = [];
// from $scope.getAllUsers(); funtion.
								$scope.getOfficeName = function(Did){

							    		for (var i = 0; i < $scope.offices.length; i++) {
							    			$scope.offices[i];
							    			if ($scope.offices[i].id == Did){
							    				return $scope.offices[i].office_name;
							    			}
							    		}
							    	};

		};

// Activating and Deactivating Users......
	$scope.clickDeactivate = function(user) { 
    	var id = user.id; 

			if (confirm("You are about to Activate/Deactivate a User, Are You Sure?") == true) {
				if (user.activated==true) {
				$http({
		            url: 'users/'+id+'.json', 
		            method: 'PUT',
		            data: angular.toJson(
					{		
						activated: false
					}
						) ,
					header: {
						'Content_Type' : 'application/json'
					}
		        }).then(function(response){
		    							alert('User successfully Updated .');
		    							$scope.getAllUsers();
									},function(response){
		    				alert('There was a problem:' + response.status);

		    			});	
				}

				if (user.activated==false) {
			$http({
		            url: 'users/'+id+'.json', 
		            method: 'PUT',
		            data: angular.toJson(
					{		
						activated: true
					}
						) ,
					header: {
						'Content_Type' : 'application/json'
					}
		        }).then(function(response){
		    							alert('User successfully Updated .');
		    							$scope.getAllUsers();
									},function(response){
		    				alert('There was a problem:' + response.status);

		    			});
				}

				} else {
				    alert(" Operation was cancelled ");
				   $scope.getAllUsers();
				}

    		};

    		   Role.getRoles().then(function (response) {
    				// body...
    				$scope.roles = response.data;
    				console.log($scope.roles);
    			})
// debugger
//     		$scope.getAllRoles = function () {
//     			// body...
//     			Role.getRoles().then(function (response) {
//     				// body...
//     				$scope.roles = response.data;
//     				console.log($scope.roles);
//     			})
//     		}

// load All Users from the Database
		 $scope.loadUser = function (id) {

            $scope.id = $routeParams.id;

  						$scope.user.admin;
						$scope.user.is_management;
						$scope.user.audit_staff;
						$scope.user.exam_staff;
						$scope.user.account_staff;

		  $scope.user = {};
    //console.log($scope.id);
        	 $http({
    				method: 'GET',
					url: "/users/"+ $scope.id +".json",
					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							//alert('Record successfully updated .');
							   $scope.user = response.data;
							    console.log($scope.user.roles)
							    if ($scope.user) {
							$scope.user.roles.forEach(role => {
								console.log(role);

									switch(role.name){
							    			case "user": 
								    		return	$scope.user.user = true;
								    		break;
								    		case "admin":
								    		return $scope.user.admin = true;
								    		console.log($scope.user.admin = true)
								    		break;
								    		case "audit_staff":
								    		return $scope.user.audit_staff = true;
								    		break;
								    		case "audit_admin":
								    		return $scope.user.audit_admin = true;
								    		case "exam_staff":
								    		return $scope.user.exam_staff = true;
								    		break;
								    		case "account_staff":
								    		return $scope.user.account_staff = true;
								    		break;
								    		default:
								    		return	$scope.user.user = true;
								    		break;

							    		}
						});
				}

    			},function(response){
    				alert('There was a problem:' + response.status);

    			});

    };


    // //$scope.current_user = function (){
    // 	// body...
    // 	Auth.currentUser().then(function(user) {
    //         // User was logged in, or Devise returned
    //         // previously authenticated session.
    //         $scope.current_user = user;
    //         console.log(user); // => {id: 1, ect: '...'}
    //     }, function(error) {
    //         // unauthenticated error
    //     });

    // //}

    		// Editing and Update User............................

	$scope.editUser = {};
    $scope.clickEdit = function(user){
    			$scope.editUser;
    			 console.log($scope.editUser);
    			$location.path("/users/"+ user.id +"/edit");
    		};



    $scope.updateUserPermission = function (user){
    	$scope.user = user;

    	 var admin = "";
		 var is_management = "";
		 var audit_role = "";
		 var exam_staff = "";
		 var audit_staff = "";
		 var account_staff = "";


	var admin = null;
    if (user.admin == true) {
    	 admin = 2;
    }

    var audit_admin = null;
    if (user.audit_admin == true) {
    	 audit_admin = 3;
    }

    var audit_staff = null;
    if (user.audit_staff == true) {
    	audit_staff = 4;
    }

    var exam_staff = null;
    if (user.exam_staff == true) {
    	exam_staff = 7;
    }

    var account_staff = null;
    if (user.account_staff == true) {
    	 account_staff = 8;
    }




	var Role_data = {
		admin: admin,
		audit_staff: audit_staff,
		audit_admin: audit_admin,
		exam_staff: exam_staff,
		account_staff: account_staff
	}

// 	var data2 = {
// 		admin, is_management: user.is_management,
// 		audit_staff, exam_staff,
// 		account_staff
// 	}

// console.log(data2);


 
     			console.log(Role_data);
  //   		$scope.user.roles.forEach(role => {
		// 		console.log(role);

		// 	switch(role.name){
		// 		case "user": 
		// 		return	$scope.user.user = true;
		// 		break;
		// 		case "admin":
		// 		return $scope.user.admin = true;
		// 		console.log($scope.user.admin = true)
		// 		break;
		// 		case "audit_staff":
		// 		return $scope.user.audit_staff = true;
		// 		break;
		// 		case "audit_admin":
		// 		return $scope.user.audit_admin = true;
		// 		case "exam_staff":
		// 		return $scope.user.exam_staff = true;
		// 		break;
		// 		default:
		// 		return	$scope.user.user = true;
		// 		break;
 	//   		}
		// });{"params": { "CandNo": searchTerm, "yearId": idYear, "dietId": idDiet}}

    			$http({
    				method: 'PATCH',
					url: " /users/set_user_role/"+ $scope.user.id +".json",
					data: Role_data,

					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							alert('User Access Role Updated successfully.');
    							$location.path('/users/'+ user.id);
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});


    	// 		$http({
    	// 			method: 'PUT',
					// url: "/users/"+ $scope.user.id +".json",
					// data: angular.toJson({
					// 	admin: user.admin,
					// 	is_management: user.is_management,
					// 	audit_role: user.audit_role,
					// 	superadmin_role: user.superadmin_role
					// }) ,
					// header: {
					// 	'Content_Type' : 'application/json'
					// }
    	// 		}).then(function(response){
    	// 						alert('User Access Role Updated successfully.');
    	// 						$location.path('/users/'+ user.id);
    	// 		},function(response){
    	// 			alert('There was a problem:' + response.status);

    	// 		});
    		}


	$scope.new_record = {};
	$scope.oneRecord = {};


    $scope.clickDetailView = function(user){
    			$location.path('/users/'+ user.id);
    		};



$scope.clickDelete = function(record) { 
    	var id = record.id; 

			if (confirm("You are about to delete a record, Are You Sure?") == true) {
			    $http({
		            url: 'records/'+id+'.json', 
		            method: 'DELETE'
		        }).then(function(response){
		    							alert('Record successfully deleted .');
		    							$scope.getAllRecords();
									},function(response){
		    				alert('There was a problem:' + response.status);

		    			});
				} else {
				    alert(" DELETE operation was cancelled ");
				    $scope.getAllRecords();
				}

    		};

    $scope.GetCountries = function (){
 				$http({
    				method: 'GET',
					url: " /countries.json",
					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							//alert('Record successfully updated .');
							    $scope.countries = response.data;
							    //console.log( $scope.countries);
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
 		};

 		//console.log($scope.selectedCountry_id);
    	$scope.clickDelete = function(order_item) { 
    	var id = order_item.id; 

			if (confirm("You are about to delete an item from Cart, Are You Sure?") == true) {
			    $http({
		            url: 'line_items/'+id+'.json', 
		            method: 'DELETE'
		        }).then(function(response){
		    							alert('Item successfully deleted .');
		    							$scope.getAllOrder_items();
									},function(response){
		    				alert('There was a problem:' + response.status);

		    			});
				} else {
				    alert(" DELETE operation was cancelled ");
				   $scope.getAllOrder_items();
				}

    		};





	 

	
}]);