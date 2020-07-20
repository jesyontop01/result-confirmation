angular.module('verifier')
	.controller("RecordsController", [ "$scope", "$http", "$location", "crudService", "$routeParams",
		function ($scope, $http, $location, crudService, $routeParams) {


	    	// Return All Confirmations to  View...............

    	$scope.records = [];
    	$scope.diets = [];
    	$scope.years = [];

		    	$scope.getAllRecords = function(){

		    		$http({
		    		method: 'GET',
		    		url: '/records.json',
					}).then(function(response){
					    		$scope.records = response.data;
					    		//console.log($scope.records);
					  						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
				    	};

		if($scope.records != null){

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

	$scope.record = {};
	$scope.new_record = {};
	$scope.oneRecord = {};

// Submit  and Create a new Record............
	$scope.submit = function(record){
		// body...
					//console.log(record);

					var recordObject = {
						diet_id : window.sessionStorage.getItem('examID'),
						year_id :window.sessionStorage.getItem('yearID'),
						candNo : $scope.record.candNo,
					    address: $scope.record.address, 
					    phoneNo: $scope.record.phoneNo,
					    photocardPix: $scope.record.photocardPix,
						picture : $scope.record.picture.base64,
						resultPix : $scope.record.resultPix.base64,
						affidavitPix : $scope.record.affidavitPix.base64
					};
					//console.log(recordObject);

					$http({
				    				method: 'POST',
									url: "/records.json",
									data: angular.toJson(recordObject) ,
									header: {
										'Content_Type' :  'application/json'
									}
							})
						.then(function(response){
							// body...
							alert("Record was saved successfully");
							//console.log(response.data);
							$scope.new_record = response.data;
							//console.log($scope.new_record);

							$location.path('/records/'+ $scope.new_record.id);
							loadrecord(response.data.id);

						}, function(response) {
							// body...
							alert("An Error occurred");
						})
					};

	// Editing and Update Record............................

	$scope.editRecord = {};
    $scope.clickEdit = function(record){
    			 $scope.editRecord = record;
    			 console.log($scope.editRecord);
    			$location.path("/records/"+ record.id +"/edit");
    		};

    // $scope.id = $routeParams.id;
    // //console.log($scope.id);
    //     	 $http({
    // 				method: 'GET',
				// 	url: "/records/"+ $scope.id +".json",
				// 	header: {
				// 		'Content_Type' : 'application/json'
				// 	}
    // 			}).then(function(response){
    // 							//alert('Record successfully updated .');
				// 			    $scope.editRecord = response.data;
				// 			     console.log($scope.editRecord);
				// 			    $scope.editRecord.ExamDietId = response.data.diet_id;
				// 			    $scope.editRecord.ExamYearId = response.data.year_id;
    // 			},function(response){
    // 				alert('There was a problem:' + response.status);

    // 			});
        // Display record by id

    $scope.loadrecord = function (id) {

            $scope.id = $routeParams.id;
    //console.log($scope.id);
        	 $http({
    				method: 'GET',
					url: "/records/"+ $scope.id +".json",
					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							//alert('Record successfully updated .');
							    $scope.editRecord = response.data;
							     //console.log($scope.editRecord);
							    $scope.editRecord.ExamDietId = response.data.diet_id;
							    $scope.editRecord.ExamYearId = response.data.year_id;
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});

    };

    $scope.UpdateRecord = function(editRecord){

                    var recordObject = {
						diet_id : $scope.editRecord || window.sessionStorage.getItem('examID'),
						year_id : $scope.editRecord || window.sessionStorage.getItem('yearID'),
						candNo : $scope.editRecord.candNo,
						picture : $scope.editRecord.picture.base64,
						address: $scope.editRecord.address, 
					    phoneNo: $scope.editRecord.phoneNo,
					    photocardPix: $scope.editRecord.photocardPix,
						resultPix : $scope.editRecord.resultPix.base64,
						affidavitPix : $scope.editRecord.affidavitPix.base64
					};
					console.log(recordObject);

    	  		$http({
    				method: 'PUT',
					url: "/records/"+ $scope.editRecord.id +".json",
					//data: angular.toJson($scope.recordObject) ,
					data: angular.toJson(
					{		
						diet_id : $scope.editRecord || window.sessionStorage.getItem('examID'),
						year_id : $scope.editRecord || window.sessionStorage.getItem('yearID'),
						candNo : $scope.editRecord.candNo,
						picture : $scope.editRecord.picture.base64,
						address: $scope.editRecord.address, 
					    phoneNo: $scope.editRecord.phoneNo,
					    photocardPix: $scope.editRecord.photocardPix,
						resultPix : $scope.editRecord.resultPix.base64,
						affidavitPix : $scope.editRecord.affidavitPix.base64
					}
						) ,
					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							alert('Record successfully updated .');
    							$scope.updated_record = response.data;
    						$location.path('/records/'+response.data.id);
							loadrecord(response.data.id);
							    //$scope.getAllRecords();
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
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

	
}]);