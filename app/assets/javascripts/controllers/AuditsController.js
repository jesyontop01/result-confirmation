angular.module('verifier')
.controller('AuditsController',['$scope', '$http', '$window','$location', 'ReceiptListService', "ResultService", '$routeParams'
	,'Auth','$rootScope','SweetAlert', 'toaster',
			function($scope, $http, $window, $location, ReceiptListService, ResultService, $routeParams
				, Auth, $rootScope,SweetAlert, toaster){

	$scope.bookletRange = {};

	$scope.loading = false;
	 


		$scope.receiptLists = [];
		    	$scope.LogReceiptBooklet = function(bookletRange){

$scope.loading = true;
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
					$scope.loading = false;
						   	//alert("New Receipt Booklet Range logged ");
						   	//alert(response.data.message);
						   	if (response.data.success == true) {
						   	SweetAlert.swal("Successful!", response.data.message, "success");
                            toaster.pop('success', "success", response.data.message);
                        }else{

                        	SweetAlert.swal("error", response.data.message, "error");
                            toaster.pop('error', "error", response.data.message);

                        }
               
					    		//console.log(response);
					    		//debugger;
					    		$scope.receiptLists = response.data;
					    		$scope.bookletRange = {};
					    		$scope.bookletRange.rangeFrom = " ";
					    		$scope.bookletRange.rangeTo = "";
					    		$scope.getAllNewReceipts();
					  			

								$scope.bookletRange1 = "";
						    		
					    	}, function(response){
					    		//alert("There was an Error: " + response.data.message);
					    		toaster.pop('error', "error", response.data.message);

					    	});
				    	};


				    	$scope.receiptLists = [];
				    	$scope.getAllNewReceipts = function() {
				    		$scope.loading = true;
				    		// body...			  ReceiptListService
				    		 $http.get('/receipt_booklets.json').then(function(response) {
				    			// body...
				    		$scope.loading = false;
				    			$scope.receiptLists = response.data.receipt_booklet;
				    			//console.log($scope.receiptLists);
				    		});
				    		

				    	}

				    	
				    	$scope.receiptLeafletCount = function() {
				    		// body...			  ReceiptListService
				    		//debugger
				    		$scope.loading = true;
				    		 $http.get('/leaflets.json').then(function(response) {
				    			// body...
				    			$scope.loading = false;
				    			$scope.receiptCount = response.data.length;
				    			//console.log($scope.receiptCount);
				    		});
				    		

				    	}

				    	$scope.receiptLeafletCount();


	$scope.results = {};
		let year_id;
		let diet_id ;
	$scope.search = function(searchTerm, yearId , dietId){ 
		if (searchTerm.length < 10){
			return;
		}

		$scope.loading = true;

		 diet_id = window.sessionStorage.getItem('examID');
		 //ExamDietService.setDiet( diet_id);

		year_id = window.sessionStorage.getItem('yearID');
			//ExamDietService.setYear( year_id);

			ResultService.ResultDetailsWithIDs(searchTerm, year_id, diet_id)
						.then(function(response){
					$scope.loading = false;
		// $http.get("/test_results.json", 
		// 		   {"params": { "CandNo": searchTerm, "yearId": year_id, "dietId": diet_id}}
		// 	).then(function(response){ 
				
				//$scope.results = response.data;

				if (response.data.length == 0){
					//alert("Candidate result is not available !");
					toaster.pop('error', "error", "Candidate result is not available !");
				}
				else
					$scope.results = response.data;
// 				$scope.results[0] = response.data;

 				//console.log($scope.results);
 				//console.log($scope.results[0].CandNo);
				$scope.applicantResult = {};
$scope.loading = true;
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
								$scope.loading = false;
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

		$scope.loading = true;
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
    					$scope.loading = false;
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
   	      	 	$scope.loading = true;
     			$http.get('/receipt_statuses.json').then(function(response){ 
					if (response == null) {
						return $scope.result.receipt_no = 0;
					} else {
						return $scope.result.receipt_no = response.data[0].receiptNo;
					}
					
		$scope.loading = false;
		             //console.log(response.data);
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
   	     	$scope.loading = true;
   	    	// body...
   	    	$http.get('/confirm_types.json').then(function(response) {
   	    		// body..
   	    		$scope.loading = false;
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
   	      	 	$scope.loading = true;
     var countryId = $scope.result.confirm_type_id;
     if (countryId) {
     			$http.get("/confirm_amounts.json", 
				   {"params": { "confirm_type_id": countryId}}
					).then(function(response){ 
						$scope.loading = false;
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
 				//$scope.result.receipt_no = {}
 				$scope.result.receipt_no = 0;
				$scope.result.receiptConfirm = false;
				$scope.result.receiptID = 0;
				
 		$scope.confirmReceipt = function(receipt_no) {
			 	// body...
			 	//$scope.result.receipt_no = receipt_no;
			 	//console.log(receipt_no);
			 	$scope.loading = true;

			 	if (receipt_no != null) {

			 		if (receipt_no == 0) {
			 			alert("Receipt can not be blank");
			 		}
			 		else{

						 	$http.get('/receipt_statuses.json', 
						 		{"params": { "receiptNo": receipt_no}
						 	}).then(function(response) {
						 		// body...
						 	$scope.loading = false;
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

			} 	
		};


	//Updating Badly used or Mutilated Receipt number

	$scope.receiptStatus = function(result) {
			 	// body...
			 	$scope.loading = true;
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
			 	$scope.loading = false;
			 		$scope.receipt = response.data;
			 		//console.log(response.data);
						if ($scope.receipt.status === "CANCELLED") {
						   	SweetAlert.swal("Successful!", 'Receipt Status corrected successfully', "success");
                            toaster.pop('success', "success", 'Receipt Status corrected successfully');

                            $scope.result = {};
							$scope.result.receiptNo = "" ;
			    
				 		//debugger
				 		    $scope.badReceipt = {};

                        }else{

                        	SweetAlert.swal("error", "Sorry, an error occurred", "error");
                            toaster.pop('error', "error", "Sorry, an error occurred");

                        //alert("Sorry, an error occurred");
			 			$scope.receiptConfirm = false;

                        }

			 		// //debugger
			 		// if ($scope.receipt.status === "CANCELLED") {
			 		// //debugger	
			   //    alert('Receipt Status corrected successfully');
					
		    // 			$scope.result = {};
						// $scope.result.receiptNo = "" ;
		    
			 		// //debugger
			 		// $scope.badReceipt = {};
			 		// }
			 		// else{
			 		// 	alert("Sorry, an error occurred");
			 		// 	$scope.receiptConfirm = false;
			 		// }

			 	});
	
		};

	//Function to accept payment using the preloaded receipt leaflets.

	$scope.result.receiptID = 0;
	$scope.result.TransId = 0;

   $scope.makePayment = function(result) {
   	// body...
   	$scope.loading = true;
   	//$scope.receipt.receiptID = 0;
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


//Building payment object for the transaction.
		$scope.applicantResult = {
		    
		    receipt_no: $scope.result.receipt_no,
		    transaction_type_id: $scope.result.TransId,
		    amount:   $scope.result.amount,
		    receipt_status_id:  $scope.result.receiptID,
		    confirm_type_id: $scope.result.confirm_type_id,
		    cand_email: $scope.result.cand_email,
		    CandName:   $scope.result.CandName,
		    PhoneNo: $scope.result.PhoneNo
		    
		};

		              SweetAlert.swal({
                 title: "Payment Transaction",
                 text: "Confirm Payment Please..?",
                 type: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#DD6B55",confirmButtonText: "Yes",
                 cancelButtonText: "No, cancel pls!",
                 closeOnConfirm: false,
                 closeOnCancel: false }, 
                 
              function(isConfirm){ 
                 if (isConfirm) {

                 	$scope.loading = true;

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
										$scope.loading = false;
										//alert('Payment was successful.');

                       SweetAlert.swal("Success!", "Payment was successful.", "success");
									toaster.pop('success', "success", 'Payment was successful.');
										$location.path('/audit/All-Payments');
										}, function(response) {
													// body...
											//alert("An Error occurred");
                            toaster.pop('error', "error", "An Error occurred.");

								})

                 } else {

                                //alert(" Operation was cancelled ");
                    //alert(" Payment was cancelled ");
				  
                    SweetAlert.swal("Cancelled", " Payment was cancelled :)", "error");
                    toaster.pop('info', "info", " Payment was cancelled ");
                     $location.path("/audit/payments");

                              $scope.loading = false;

                 }
              });


		//console.log( $scope.applicantResult);

		// if (confirm("Confirm Payment Please..?") == true) {

		// $http({
		// 	method: 'POST',
		// 	url: "/payments.json",
		// 	data: angular.toJson($scope.applicantResult) ,
		// 	header: {
		// 				'Content_Type' :  'application/json'
		// 				}
		// 		})
		// 		.then(function(response){
		// 					// body...
		// 		$scope.loading = false;
		// 		alert('Payment was successful.');
		// 		$location.path('/audit/All-Payments');
		// 		}, function(response) {
		// 					// body...
		// 			alert("An Error occurred");
		// })

		// }
		// else {
		// 		    alert(" Payment was cancelled ");
		// 		   $location.path("/audit/payments");
		// }
   }


}]);