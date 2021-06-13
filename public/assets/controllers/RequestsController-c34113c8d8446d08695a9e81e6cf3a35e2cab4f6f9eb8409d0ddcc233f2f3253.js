  angular.module('verifier')
	.controller("RequestsController", [ "$scope", "$http", "$location", "crudService", "$routeParams",
		function ($scope, $http, $location, crudService, $routeParams) {


	    	// Return All Confirmations to  View...............

    	$scope.requests = [];
    	$scope.diets = [];
    	$scope.years = [];

		    	$scope.getAllRequests = function(){

		    		$http({
		    		method: 'GET',
		    		url: '/requests.json',
					}).then(function(response){
					    		$scope.requests = response.data;
					    		//console.log($scope.requests);
					  						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
				    	};

		if($scope.requests != null){

			$http.get("/diets.json").then(function(response){
				$scope.diets = response.data;
				//console.log($scope.diets);
			},function(response){
				alert("There was a problem: " + response.status);
			});
			
			$http.get('/years.json').then(function(response){
			$scope.years = response.data;
			//console.log($scope.years);
			},function(response){
				alert("There was an Error With the Years' Server");
			});					    		

		};
								  	
									

    	//$scope.getAllRecords();


// Return Array of Exam Diet Names ........................
//using the returned $scope.confirms = []; 
//And $scope.diets = [];
// from $scope.getAllConfirmation(); funtion.
								$scope.getExamDietName = function(Did){

							    		for (var i = 0; i < $scope.diets.length; i++) {
							    			$scope.diets[i];
							    			if ($scope.diets[i].id == Did){
							    				return $scope.diets[i].Diet;
							    			}
							    		}
							    	};

							    	$scope.getExamYearName = function(Did){

							    		for (var i = 0; i < $scope.years.length; i++) {
							    			$scope.years[i];
							    			if ($scope.years[i].id == Did){
							    				return $scope.years[i].Year;
							    			}
							    		}
							    	};
// Create new Record..................................................
//......................................................................

	$scope.request = {};
	$scope.new_request = {};
	$scope.onerequest = {};

// Submit  and Create a new Record............
	$scope.submit = function(request){
		// body...
					//console.log(record);

					var requestObject = {
						diet_id : window.sessionStorage.getItem('examID'),
						year_id :window.sessionStorage.getItem('yearID'),
						candNo : $scope.request.candNo,
						fullName: $scope.request.fullName,
					    address: $scope.request.address, 
					    phoneNum: $scope.request.phoneNum,
					    photocardPix: $scope.request.photocardPix.base64,
						picture : $scope.request.picture.base64,
						resultPix : $scope.request.resultPix.base64,
						affidavitPix : $scope.request.affidavitPix.base64
					};
					//console.log(recordObject);

					$http({
				    				method: 'POST',
									url: "/requests.json",
									data: angular.toJson(requestObject) ,
									header: {
										'Content_Type' :  'application/json'
									}
							})
						.then(function(response){
							// body...
							alert("Record was saved successfully");
							//console.log(response.data);
							$scope.new_request = response.data;
							//console.log($scope.new_record);

							$location.path('/requests/'+ $scope.new_request.id);
							loadrecord(response.data.id);

						}, function(response) {
							// body...
							alert("An Error occurred");
						})
					};

	// Editing and Update Record............................

	$scope.editRequest = {};
    $scope.clickEdit = function(request){
    			 $scope.editRequest = request;
    			 console.log($scope.editRequest);
    			$location.path("/requests/"+ request.id +"/edit");
    		};

    // $scope.id = $routeParams.id;
    // //console.log($scope.id);
    //     	 $http({
    // 				method: 'GET',
				// 	url: "/requests/"+ $scope.id +".json",
				// 	header: {
				// 		'Content_Type' : 'application/json'
				// 	}
    // 			}).then(function(response){
    // 							//alert('Record successfully updated .');
				// 			    $scope.editRequest = response.data;
				// 			     console.log($scope.editRequest);
				// 			    $scope.editRequest.ExamDietId = response.data.diet_id;
				// 			    $scope.editRequest.ExamYearId = response.data.year_id;
    // 			},function(response){
    // 				alert('There was a problem:' + response.status);

    // 			});
        $scope.clickDetailView = function(request){
    			$location.path("/requests/"+ request.id);
    		};
        // Display request by id
      
    $scope.loadrecord = function (id) {

            $scope.id = $routeParams.id.split(",");
            let resultExam_no =  $scope.id[1];
            let idYear = $scope.id[0];

    //console.log($scope.id);
    $http.get("/requests.json", 
				   {"params": { "candNo": resultExam_no, "year_id": idYear}}
			)
     //    	 $http({
    	// 			method: 'GET',
					// url: "/requests/"+ $scope.id +".json",
					// header: {
					// 	'Content_Type' : 'application/json'
					// }
    	// 		})
    	.then(function(response){
    							//alert('Record successfully updated .');
							    $scope.editRequest = response.data[0];
							     console.log($scope.editRequest);
							    $scope.editRequest.ExamDietId = response.data.diet_id;
							    $scope.editRequest.ExamYearId = response.data.year_id;
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});

    };

    $scope.UpdateRecord = function(editRecord){

                    var recordObject = {
						diet_id : $scope.editRecord || window.sessionStorage.getItem('examID'),
						year_id : $scope.editRecord || window.sessionStorage.getItem('yearID'),
						candNo : $scope.editRequest.candNo,
						picture : $scope.editRequest.picture.base64,
						address: $scope.editRequest.address, 
					    phoneNo: $scope.editRequest.phoneNo,
					    photocardPix: $scope.editRequest.photocardPix,
						resultPix : $scope.editRequest.resultPix.base64,
						affidavitPix : $scope.editRequest.affidavitPix.base64
					};
					console.log(requestObject);

    	  		$http({
    				method: 'PUT',
					url: "/requests/"+ $scope.editRequest.id +".json",
					//data: angular.toJson($scope.recordObject) ,
					data: angular.toJson(
					{		
						diet_id : $scope.editRequest || window.sessionStorage.getItem('examID'),
						year_id : $scope.editRequest || window.sessionStorage.getItem('yearID'),
						candNo : $scope.editRequest.candNo,
						picture : $scope.editRequest.picture.base64,
						address: $scope.editRequest.address, 
					    phoneNo: $scope.editRequest.phoneNo,
					    photocardPix: $scope.editRequest.photocardPix,
						resultPix : $scope.editRequest.resultPix.base64,
						affidavitPix : $scope.editRequest.affidavitPix.base64
					}
						) ,
					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							alert('Request successfully updated .');
    							$scope.updated_request = response.data;
    						$location.path('/requests/'+response.data.id);
							loadrecord(response.data.id);
							    //$scope.getAllRecords();
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
    		};

    	$scope.clickDelete = function(record) { 
    	var id = request.id; 

			if (confirm("You are about to delete a record, Are You Sure?") == true) {
			    $http({
		            url: 'requests/'+id+'.json', 
		            method: 'DELETE'
		        }).then(function(response){
		    							alert('Record successfully deleted .');
		    							$scope.getAllRequests();
									},function(response){
		    				alert('There was a problem:' + response.status);

		    			});
				} else {
				    alert(" DELETE operation was cancelled ");
				    $scope.getAllRequests();
				}

    		};

	
}]);

 
