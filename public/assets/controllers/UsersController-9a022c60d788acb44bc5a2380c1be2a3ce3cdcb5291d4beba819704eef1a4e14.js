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
    	$scope.cdate = new Date();

			if (confirm("You are about to Activate/Deactivate a User, Are You Sure?") == true) {
				if (user.activated==true) {
				$http({
		            url: 'users/'+id+'.json', 
		            method: 'PUT',
		            data: angular.toJson(
					{		
						activated: false,
						activated_at: $scope.cdate 
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
						activated: true,
						activated_at: $scope.cdate 
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

		$scope.uploadedFile = function(element){
//debugger
			$scope.currentFile = element.files[0];
		    var reader = new FileReader();

		    reader.onload = function(event) {
		    	var output = document.getElementById('output');
    			output.src = URL.createObjectURL(element.files[0]);
	
		      $scope.image_source = event.target.result
		      $scope.$apply(function($scope) {
		        $scope.files = element.files;
		      });
		    }
                    reader.readAsDataURL(element.files[0]);
		  }

		  $scope.loadSignature = function (record) {
		  	// body...
		  	console.log(record.signature);
///users/upload_user_signature/:id
		  	    $http({
    				method: 'POST',
					//url: " /users/upload_user_signature/"+ $scope.user.id +".json",
					url: " /signatures.json",
					data: record.signature,

					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							alert('User Signature Updated successfully.');
    							//$location.path('/users/'+ user.id);
    							
    							window.location.reload();
    							$location.path('/');
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
		  }


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
							   console.log($scope.user);

							   if ($scope.user.role.name === "exam_management") {
							   	$scope.user.staffCategory = "management";

							   	$scope.user.is_management = true;

							   } else {
							   	$scope.user.staffCategory = "national";

							   		$scope.user.is_management = false;
							   }
							    //console.log($scope.user)

							    if ($scope.user.role) {
							// $scope.user.roles.forEach(role => {
							// 	console.log(role);
							var role = $scope.user.role;
						//debugger
									switch(role.name){

								    		case "admin":
								    		return $scope.user.admin = true;
								    		//console.log($scope.user.admin = true)
								    		break;
								    		case "audit_staff":
								    		//return $scope.user.audit_staff = true;
								    		return $scope.user.assignment = "audit_staff" ;
								    		break;
								    		// case "audit_admin":
								    		// return $scope.user.audit_admin = true;
								    		// //return $scope.user.assignment = true;
								    		case "exam_management":
								    		//return $scope.user.exam_staff = true;
								    		return $scope.user.assignment = "exam_staff";
								    		break;

								    		case "exam_national":
								    		//return $scope.user.exam_staff = true;
								    		return $scope.user.assignment = "exam_staff";
								    		break;

								    		case "account_staff":
								    		//return $scope.user.account_staff = true;
								    		return $scope.user.assignment = "account_staff";
								    		break;
								    		default:
								    		return	$scope.user.user = true;
								    		break;

							    		}
						// });
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
    			// console.log($scope.editUser);
    			$location.path("/users/"+ user.id +"/edit");
    		};


$scope.user.assignment = "";
   $scope.updateUserPermission = function (user){
    	$scope.user = user;

    	 var admin = "";
		 var is_management = "";
		 var audit_role = "";
		 var exam_staff = "";
		 var audit_staff = "";
		 var account_staff = "";
// 		 //console.log($scope.user.assignment);

// $scope.user.assignment == "";
// 	var admin = null;
//     if (user.admin == true) {
//     	 admin = 2;
//     }

//     // var audit_admin = null;
//     // if (user.audit_admin == true) {
//     // 	 audit_admin = 3;
//     // }

//     var audit_staff = null;
//     // if (user.audit_staff == true) {
//     // 	audit_staff = 4;
//     // }
//     if ($scope.user.assignment == "audit") {
//     	audit_staff = 4;
//     }

//     var exam_staff = null;
//     // if (user.exam_staff == true) {
//     // 	exam_staff = 7;
//     // }
//     if ($scope.user.assignment == "tad") {
//      	exam_staff = 7;
//     }

    var account_staff = null;
    // if (user.account_staff == true) {
    // 	 account_staff = 8;
    // }
    // if ($scope.user.assignment == "account") {
    // 	 account_staff = 8;
    // }
    var management = false;
    var national = false;

    if ($scope.user.staffCategory =="management") {
    	//console.log("it is management");
    	management = true;
    } else {
    	//console.log("it is national");
    	management = false;
    }


	var userUpdate = {
		roleName: $scope.user.assignment,
		is_management: management
	}

	console.log(userUpdate);

// 	var data2 = {
// 		admin, is_management: user.is_management,
// 		audit_staff, exam_staff,
// 		account_staff
// 	}

 // console.log(Role_data);


 
     			//console.log(Role_data);
  

    			$http({
    				method: 'PATCH',
					url: " /users/set_user_role/"+ $scope.user.id +".json",
					data: userUpdate,

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






	 

	
}]);
