angular.module('verifier')
	.controller("UsersController", [ "$scope", "$http", "$location", "crudService", "$routeParams","Auth",
		function ($scope, $http, $location, crudService, $routeParams, Auth) {


	    	// Return All Confirmations to  View...............

    	$scope.users = [];
    	

		$scope.getAllUsers = function(){

		    		$http({
		    		method: 'GET',
		    		url: '/users.json',
					}).then(function(response){
					    		$scope.users = response.data;
					    		console.log($scope.users);
					  						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
				    	};

		$scope.getAllUsers();

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

// load All Users from the Database
		 $scope.loadUser = function (id) {

            $scope.id = $routeParams.id;
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
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});

    };

      $scope.containsFalsy = (user) => arr.some(o => o.admin === false);

    $scope.IsAdmin = function (user) {
    	// body...
    	if (user.admin == true) {
    		return true;
    	}
    }


    //$scope.current_user = function (){
    	// body...
    	Auth.currentUser().then(function(user) {
            // User was logged in, or Devise returned
            // previously authenticated session.
            $scope.current_user = user;
            console.log(user); // => {id: 1, ect: '...'}
        }, function(error) {
            // unauthenticated error
        });

    //}

    		// Editing and Update User............................

	$scope.editUser = {};
    $scope.clickEdit = function(user){
    			$scope.editUser;
    			 console.log($scope.editUser);
    			$location.path("/users/"+ user.id +"/edit");
    		};

    $scope.updateUserPermission = function (user){
    	$scope.user = user;
    			$http({
    				method: 'PUT',
					url: "/users/"+ $scope.user.id +".json",
					data: angular.toJson({
						admin: user.admin,
						is_management: user.is_management,
						audit_role: user.audit_role,
						superadmin_role: user.superadmin_role
					}) ,
					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							alert('User Access Role Updated successfully.');
    							$location.path('/users/'+ user.id);
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
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