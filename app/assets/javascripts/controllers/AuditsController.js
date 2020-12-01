angular.module('verifier')
.controller('AuditsController',['$scope', '$http', '$window','$location', 'ReceiptListService', "ResultService", '$routeParams','Auth','$rootScope',
			function($scope, $http, $window, $location, ReceiptListService, ResultService, $routeParams, Auth, $rootScope){

	$scope.bookletRange = {};
	 


		$scope.receiptLists = [];
		    	$scope.LogReceiptBooklet = function(bookletRange){

		    		$scope.bookletRange1 = {
		    			office_id: window.sessionStorage.getItem('officeID'),
		    			rangeFrom: bookletRange.rangeFrom,
						rangeTo: bookletRange.rangeTo 
		    		};

							$http({
				    				method: 'POST',
									url: "/receipt_booklets.json",
									data: angular.toJson($scope.bookletRange1) ,
									header: {
										'Content_Type' :  'application/json'
									}
							}).then(function(response){

						   	//alert("New Receipt Booklet Range logged ");
						   	alert(response.data.message);
					    		//console.log($scope.confirms);
					    		//debugger;
					    		$scope.receiptLists = response.data;
					    		$scope.bookletRange = {};
					    		$scope.bookletRange.rangeFrom = " ";
					    		$scope.bookletRange.rangeTo = "";
					    		//console.log(response);
					  			//ReceiptListService.setReceiptStatus($scope.receiptLists);

				$scope.bookletRange1 = "";
						    		
					    	}, function(response){
					    		alert("There was an Error: " + response.data.message);
					    	});
				    	};



				    	$scope.getAllNewReceipts = function() {
				    		// body...
				    		$scope.receiptLists = ReceiptListService.getReceiptStatus();
				    	}


	$scope.results = {};
		let year_id;
		let diet_id ;
	$scope.search = function(searchTerm, yearId , dietId){ 
		if (searchTerm.length < 10){
			return;
		}

		 diet_id = window.sessionStorage.getItem('examID');
		 //ExamDietService.setDiet( diet_id);

		year_id = window.sessionStorage.getItem('yearID');
			//ExamDietService.setYear( year_id);

			ResultService.ResultDetailsWithIDs(searchTerm, year_id, diet_id)
						.then(function(response){
		// $http.get("/test_results.json", 
		// 		   {"params": { "CandNo": searchTerm, "yearId": year_id, "dietId": diet_id}}
		// 	).then(function(response){ 
				
				//$scope.results = response.data;

				if (response.data.length == 0){
					alert("Candidate result is not available !");
				}
				else
					$scope.results = response.data;
// 				$scope.results[0] = response.data;

 				//console.log($scope.results);
 				//console.log($scope.results[0].CandNo);
				$scope.applicantResult = {};

		$scope.applicantResult1 = {
	  	    Picture: $scope.results[0].Picture,
	  	    ExamDiet: $scope.results[0].ExamDiet,
	  	    ExamYear: $scope.results[0].ExamYear,
	  	    CandNo: $scope.results[0].CandNo,
	  	    CandName: $scope.results[0].CandName,
	  	    Sex: $scope.results[0].Sex,
	  	    DOB: $scope.results[0].DOB,
	  	    CentreName: $scope.results[0].CentreName,
	  	    Subject1: $scope.results[0].Subject1,
	  	    Grade1: $scope.results[0].Grade1,  
	  	    Subject2: $scope.results[0].Subject2,
	  	    Grade2: $scope.results[0].Grade2,   
	  	    Subject3: $scope.results[0].Subject3,
	  	    Grade3: $scope.results[0].Grade3,   
	  	    Subject4: $scope.results[0].Subject4,
	  	    Grade4: $scope.results[0].Grade4,   
	  	    Subject5: $scope.results[0].Subject5,
	  	    Grade5: $scope.results[0].Grade5,       
	  	    Subject6: $scope.results[0].Subject6,
	  	    Grade6: $scope.results[0].Grade6,   
	  	    Subject7: $scope.results[0].Subject7,
	  	    Grade7: $scope.results[0].Grade7,   
	  	    Subject8: $scope.results[0].Subject8,
	  	    Grade8: $scope.results[0].Grade8,   
	  	    Subject9: $scope.results[0].Subject9,
	  	    Grade9: $scope.results[0].Grade9,  
	  	    NoOfSubjects: $scope.results[0].NoOfSubjects,
	  	    dietId:  window.sessionStorage.getItem('examID'),
	  	    yearId: window.sessionStorage.getItem('yearID')
	  	}
//console.log($scope.applicantResult1);
             

						$http({
							method: 'POST',
							url: "/test_results.json",
							data: angular.toJson($scope.applicantResult1) ,
							header: {
										'Content_Type' :  'application/json'
										}
								})
								.then(function(response){
											// body...
								alert('test_results was created successfully.');
								}, function(response) {
											// body...
									alert("An Error occurred");
						})



			}
			, function(response){ 
				alert("There was a problem: " + response.status); 
			});
		}


	$scope.viewDetails = function(result){
			$location.path("/audit/payment/"+ result.ExamYear +'/' + result.CandNo );
		}

//loadResultDetail(result)
		$scope.result = [];
		
	$scope.loadResultDetail = function (CandNo) {

        let searchTerm = $routeParams.CandNo;
     //let diet_id = ExamDietService.getDiet();
    
       	  diet_id = window.sessionStorage.getItem('examID');
	 //let year_id = ExamDietService.getYear();

	  	year_id = window.sessionStorage.getItem('yearID');
		//console.log(diet_id, year_id, searchTerm );
			

		// ResultService.ResultDetailsWithIDs(searchTerm, year_id, diet_id)
		// 				.then(function(response){
		// $http.get("/exams.json", 
		// 		   {"params": { "CandNo": searchTerm, "yearId": year_id, "dietId": diet_id}}
		// 	).then(function(response){

			$http.get("/test_results.json", 
				   {"params": { "CandNo": searchTerm, "yearId": year_id, "dietId": diet_id}}
			).then(function(response){ 
    							//alert('Record successfully updated .');
							    $scope.result = response.data[0];
							    //console.log( $scope.result);
							    							   
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});		
    }

    //$scope.result.receipt_no =  $scope.GetNextReceiptNo();
 //$scope.GetNextReceiptNo();

$scope.receipt = {};

   	      	 $scope.GetNextReceiptNo = function () {
     			$http.get('/receipt_statuses.json').then(function(response){ 
					
					return $scope.result.receipt_no = response.data[0].receiptNo;

		             //console.log(response.data[0]);
		         },function (response) {
		             alert('Unexpected Error');
		         });
     }
//debugger
  $scope.$watch('$scope.result', function (newVal, oldVal) {
	 $scope.GetNextReceiptNo();
	});
//debugger
  //      	$http.get('/receipt_statuses.json').then(function(response){ 
					
		// return $scope.result.receipt_no = response.data.receiptNo;

		//        console.log(response.data[0]);
		//     },function (response) {
		//              alert('Unexpected Error');
		//  });

    


    //--------- Creating A synchronious Drop-down for Confirmation Type
	//---------- And Confirmation Country-------
	//------ Selecting the $scope.confirm_type_id = {} from $scope.confirmType

   	    $scope.confirmType = [];
   	    $scope.confirm_type_id = {};
   	     $scope.getConfirmType = function() {
   	    	// body...
   	    	$http.get('/confirm_types.json').then(function(response) {
   	    		// body...
   	    		$scope.confirmType = response.data;
   	    		//console.log(response.data);
   	    	}, function(response) {
   	    		// body...
   	    	});

   	    }
//console.log( $scope.confirmType);
   	   //$scope.getConfirmType();

   	   //-------------Get The confirmation Amount/Fee from the confirmation type.
$scope.result.amount = 0;
   	      	 $scope.GetAmount = function (countryId) {
     var countryId = $scope.result.confirm_type_id;
     if (countryId) {
     			$http.get("/confirm_amounts.json", 
				   {"params": { "confirm_type_id": countryId}}
					).then(function(response){ 
						$scope.result.amount = response.data.amount;
		             //console.log(response.data);
		         },function (response) {
		             alert('Unexpected Error');
		         });
     }
     else {
        alert('Please Select Confirmation type.');
     }
 }

//Method to get the status of Receipt to use
 				$scope.result.receipt_no = {}
				$scope.result.receiptConfirm = false;
				$scope.result.receiptID = 0;
				
 		$scope.confirmReceipt = function(receipt_no) {
			 	// body...
			 	//$scope.result.receipt_no = receipt_no;
			 	//console.log(receipt_no);

			 	if (receipt_no != null) {


			 	$http.get('/receipt_statuses.json', 
			 		{"params": { "receiptNo": receipt_no}
			 	}).then(function(response) {
			 		// body...
			 		$scope.receipt = response.data[0];
			 		//console.log(response.data);
			 		//debugger
			 		if ($scope.receipt != null && $scope.receipt.status === "UNUSED") {
			 		//debugger	
			 		$scope.receiptConfirm = true;
			 		$scope.result.receiptID = $scope.receipt.id;
			 		//console.log($scope.result.receiptID);
			 		//debugger
			 		}
			 		else{
			 			alert("Sorry, This receipt has being used");
			 			$scope.receiptConfirm = false;
			 		}
			 	});

			} 	
		};


	//Updating Badly used or Mutilated Receipt number

	$scope.receiptStatus = function(result) {
			 	// body...
			 	//$scope.result.receipt_no = receipt_no;
			 	//console.log(receipt_no);

				   $scope.badReceipt = {
		    			receiptNo: result.receiptNo,
						status: result.status 
		    		};

		    		//console.log($scope.badReceipt);
		    		$http({
							method: 'PATCH',
							url: '/receipt_statuses/receipt_correction/'+ result.receiptNo+ '.json',
							data: {status: result.status },
							header: {
										'Content_Type' :  'application/json'
									}
						}) 
		    		.then(function(response) {
			 		// body...
			 		$scope.receipt = response.data;
			 		//console.log(response.data);
			 		//debugger
			 		if ($scope.receipt.status === "CANCELLED") {
			 		//debugger	
			alert('Receipt Status corrected successfully');
					
		    			$scope.result = {};
						$scope.result.receiptNo = "" ;
		    
			 		//debugger
			 		$scope.badReceipt = {};
			 		}
			 		else{
			 			alert("Sorry, an error occurred");
			 			$scope.receiptConfirm = false;
			 		}
			 	});
	
		};



   $scope.makePayment = function(result) {
   	// body...
   	$scope.receipt.receiptID = 0;
   	$scope.receipt = {};

  //  	$scope.applicantResult = {
  //  			diet_id:  window.sessionStorage.getItem('examID'),
	 //  	    year_id:  window.sessionStorage.getItem('yearID'),
		//     exam_no:  $scope.result.CandNo,
		//     amount:   $scope.result.amount,
		//     receipt_no: $scope.result.receipt_no,
		//     receiptID:  $scope.result.receiptID,
		//     confirm_type_id: $scope.result.confirm_type_id,
		//     cand_email: $scope.result.cand_email
		// };

		$scope.applicantResult = {
		    
		    receipt_no: $scope.result.receipt_no,
		    transaction_type_id: $scope.result.TransId,
		    amount:   $scope.result.amount,
		    receiptID:  $scope.result.receiptID,
		    confirm_type_id: $scope.result.confirm_type_id,
		    cand_email: $scope.result.cand_email,
		    CandName:   $scope.result.CandName,
		    PhoneNo: $scope.result.PhoneNo
		    
		};

		console.log( $scope.applicantResult);

		if (confirm("Confirm Payment Please..?") == true) {

		$http({
			method: 'POST',
			url: "/payments.json",
			data: angular.toJson($scope.applicantResult) ,
			header: {
						'Content_Type' :  'application/json'
						}
				})
				.then(function(response){
							// body...
				alert('Payment was successful.');
				$location.path('/search');
				}, function(response) {
							// body...
					alert("An Error occurred");
		})

		}
		else {
				    alert(" Payment was cancelled ");
				   $location.path("/audit/search");
		}
   }


}]);