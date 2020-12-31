angular.module('verifier')
	.controller("ConfirmationsController", [ "$scope", "$http", "$location", "crudService",'$window', "$routeParams",
		'ExamDietService',"ConfirmationService", "fileUpload", "ResultService", "$route", "WebClient", "userSession",
		function ( $scope, $http, $location, crudService,$window, $routeParams, ExamDietService, ConfirmationService, 
			fileUpload, ResultService, $route, WebClient, userSession) {
var vm = this ;

$scope.results = {};
		let year_id;
		let diet_id ;
	$scope.search = function(searchTerm, yearId , dietId){ 
		if (searchTerm.length < 10){
			return;
		}

		 diet_id = window.sessionStorage.getItem('examID');
		 ExamDietService.setDiet( diet_id);

		year_id = window.sessionStorage.getItem('yearID');
			ExamDietService.setYear( year_id);

		$http.get("/exams.json", 
				   {"params": { "CandNo": searchTerm, "yearId": year_id, "dietId": diet_id}}
			).then(function(response){ 
				
				//$scope.results = response.data;

				if (response.data.length == 0){
					alert("Candidate result is not available !");
				}
				else
					$scope.results = response.data;

				//console.log($scope.results);
				//console.log(response.status);
			}
			, function(response){ 
				alert("There was a problem: " + response.status); 
			});
		}


	$scope.viewDetails = function(result){
			$location.path("/search/" + result.CandNo );
		}


	$scope.addressDetails = function(result){
			if (result.Picture == null) {
				alert("Sorry !, Confirmation cannot be Generated without Picture.\nRequest Picture upload at ICTD");
				$location.path("/search");
			}
			else{
				$location.path("/address/" + result.CandNo );
			}
			
		}
//loadResultDetail(result)
		$scope.result = [];
	$scope.loadResultDetail = function (CandNo) {

        let searchTerm = $routeParams.CandNo;
     //let diet_id = ExamDietService.getDiet();
    
       	let  diet_id = window.sessionStorage.getItem('examID');
	 //let year_id = ExamDietService.getYear();

	  	let year_id = window.sessionStorage.getItem('yearID');
		console.log(diet_id, year_id, searchTerm );
			

		$http.get("/exams.json", 
				   {"params": { "CandNo": searchTerm, "yearId": year_id, "dietId": diet_id}}
			).then(function(response){ 
    							//alert('Record successfully updated .');
							    $scope.result = response.data[0];
							    console.log( $scope.result);
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
    };

    //$scope.loadResultDetail(CandNo);

      	// Functions to Close Modal Pop-Up (Creation)...........

    	$scope.closeModalSave = function(){
    		var modal_popup = angular.element('#myModalSave');
    		modal_popup.modal('hide');
    	};


    	// Functions to Close Modal Pop-Up (Editing)...........

    	$scope.closeModal = function(){
    		var modal_popup = angular.element('#myModalEdit');
    		modal_popup.modal('hide');
    	};

    	// Functions to Open Modal Pop-Up..............................................

    	$scope.openModal = function(){
    		var modal_popup = angular.element('#myModalSave');
    		modal_popup.modal('show');
    	};


    	//close alert message.......................................................
    	$scope.closeMessage = function(){

    		 $scope.successMessage = " ";						
			 $scope.errorMessage = "" ;
							
    	};

    	$scope.result = {};

   $scope.createConfirm = function(result) {
   	// body...

   	console.log( $scope.result);
   	$scope.applicantResult = {
   			diet_id:  window.sessionStorage.getItem('examID'),
	  	    year_id: window.sessionStorage.getItem('yearID'),
		    exam_no:  $scope.result.CandNo,
		    receipt_no: $scope.result.receipt_no,
		    Cand_address: $scope.result.Cand_address,
		    confirm_type_id: $scope.result.confirm_type_id,
		    dest_title: $scope.result.dest_title,
		    dest_address1: $scope.result.dest_address1,
		    dest_address2: $scope.result.dest_address2,
		    dest_location: $scope.result.dest_location,
		    confirm_country_id: $scope.result.confirm_country_id,
		    receiptID:         $scope.result.receiptID,
		    dest_email: $scope.result.dest_email,
		     WES_Ref:  $scope.result.WES_Ref,
		     payment_id: $scope.result.paymentID
		};

		//console.log( $scope.applicantResult);

		$http({
			method: 'POST',
			url: "/confirmations.json",
			data: angular.toJson($scope.applicantResult) ,
			header: {
						'Content_Type' :  'application/json'
						}
				})
				.then(function(response){
							// body...
				alert('confirmation was created successfully.');
				$scope.closeModalSave('#myModalSave');
				$location.path('/confirmations');
				}, function(response) {
							// body...
					alert("An Error occurred");
		})
   }

	$scope.result.receiptConfirm1 = false;
		   $scope.getdetails = function () {
//debugger
//console.log($scope.result.receiptConfirm1);
				if ($scope.result.receiptConfirm1 === true)

				$scope.result.receiptConfirm1 = true;

				else

				$scope.result.receiptConfirm1 = false;

		}

    				$scope.result.receipt_no = {}
				$scope.result.receiptConfirm = false;
				$scope.result.receiptID = 0;

			$scope.confirmPayment = function(receipt_no) {
			 	// body...
			 	//$scope.result.receipt_no = receipt_no;

			 	if (receipt_no != null) {


			 	
			 	$http.get('/payments/receipt_payment_details.json', 
			 		{"params": { "receiptNo": receipt_no}
			 	}).then(function(response) {
			 		// body...
			 		$scope.payment = response.data;
			 		//console.log($scope.payment);
			 		//debugger
			 		if ($scope.payment != null && $scope.payment.success === true) {
			 		//debugger	
			 		$scope.receiptConfirm2 = true;
			 		$scope.result.Cand_payment_Name = response.data.payment[0].CandName;
			 		 $scope.result.cand_email = response.data.payment[0].cand_email;
			 		$scope.result.amount = response.data.payment[0].amount;
			 		$scope.result.paymentID = response.data.payment[0].id;
			 		
			 		//debugger
			 		}
			 		else if ($scope.payment != null && $scope.payment.success === false){
			 			alert($scope.payment.message);
			 			$scope.receiptConfirm2 = false;
			 			$scope.result.receiptConfirm1 = false;
			 		}
			 	});

			} 	
		}


 				$scope.result.receipt_no = {}
				$scope.result.receiptConfirm = false;
				$scope.result.receiptID = 0;

			$scope.confirmReceipt = function(receipt_no) {
			 	// body...
			 	//$scope.result.receipt_no = receipt_no;

			 	if (receipt_no != null) {


			 	
			 	$http.get('/receipt_statuses.json', 
			 		{"params": { "receiptNo": receipt_no}
			 	}).then(function(response) {
			 		// body...
			 		$scope.receipt = response.data[0];
			 		//console.log($scope.receipt);
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


   // Return All Confirmations to  View...............

    	$scope.confirms = [];
    	$scope.diets = [];
    	$scope.years = [];

		$scope.getAllConfirmation = function(){
		    		$http({
		    		method: 'GET',
		    		url: '/confirmations.json',
					}).then(function(response){
					    		$scope.confirms = response.data;
					    		//console.log($scope.confirms);
					  
						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
			};

// Establish Connection To WES and Upload File

  	var vm = this;
	$scope.webClientURL  = {};

	$scope.getAllWebServices = function () {
		// body...

		WebClient.getWebServices().then(function(response){
			$scope.webClients  = response.data.data;
			console.log($scope.webClients );
		},function(response){
			alert("There was a problem: " + response.status);
		});

	}


	$scope.selectWebService = function(confirm){
			$location.path("/webServices/" + confirm.id );
		}

	$scope.clientSelected = {};

	$scope.GetValue = function(d) {
		// body...
		$scope.clientSelected = d;

			console.log($scope.clientSelected);
		

		$scope.$watch('clientSelected.id', function(newValue, oldValue){
		window.sessionStorage.setItem('clientID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})		
		$scope.$watch('clientSelected.authURL', function(newValue, oldValue){
		window.sessionStorage.setItem('clientAuthURL', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})
		$scope.$watch('clientSelected.submitURL', function(newValue, oldValue){
		window.sessionStorage.setItem('clientSubmitURL', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})


	}

$scope.webClientURL = {};

$scope.clientURL = null;

$scope.ConnecttoWES = function(confirmID) {
	// body...

	$scope.confirmID = $routeParams.id;
	$scope.clientSelected.clientURL
	
	console.log($scope.clientSelected.clientURL);
		//$http.post('http://localhost:5000/auth_user?email=waec@waec.org.ng&password=waecyaba')
		$http.post($scope.clientSelected.clientURL)
		  .then(function(response) {
		  	// body...
		  	 response.data;
		  	if (response.status == 200) {

		  		alert("Login to WES was successful");
		  		$location.path('/wes_upload/'+ $scope.confirmID);
		  	}
		  	//console.log(response.data);
//debugger
		  	 if(response.data.auth_token) {
			    window.sessionStorage.setItem('token', JSON.stringify(response.data.auth_token));

			    //console.log(window.sessionStorage.getItem('token'));
			  }
  

		  }, function(response) {
		  	// body...
		  	alert("WES Server not available , please try later " + response.status);
		  })



	//http://localhost:3000//auth/sign_in?email=waec@waec.org.ng&password=waecyaba
// 		$http.post('http://localhost:5000//auth/sign_in?email=waec@waec.org.ng&password=waecyaba')
// 		  .then(function(response) {
// 		  	// body...
// 		  	response.data;
// 		  	if (response.status == 200) {
// 		  		$location.path('/wes_upload/'+ confirm.id);
// 		  	}
// 		  	console.log(response.data);
// 		  	console.log(response.headers());
// 		  	console.log(response.headers("access-token"));
// debugger
// 		  	 if(response.headers("access-token")) {
// 			    let authHeaders = {
// 			      'access-token': response.headers('access-token'),
// 			      'client': response.headers('client'),
// 			      'uid': response.headers('uid'),
// 			      'expiry': response.headers('expiry'),
// 			      'token-type': response.headers('token-type')
// 			    }
// 			    window.sessionStorage.setItem('authHeaders', JSON.stringify(authHeaders));

// 			    console.log(window.sessionStorage.getItem('authHeaders'));
// 			  }
  

// 		  }, function(response) {
// 		  	// body...
// 		  	alert(response.status);
// 		  });

	//$location.path('/wes_upload/'+ confirm.id);

}



$scope.getConfirmByID = function(confirmId) {
	// body...
	confirmId = $routeParams.id
	$scope.confirm = {};

	$http.get('/confirmations/'+ confirmId +'.json')
		  .then(function(response) {
		  	// body...
		  	$scope.confirm = response.data[0];
		  	//console.log(response.data);

		  }, function(response) {
		  	// body...
		  	alert(response.status);
		  });

}
	$scope.wesApplicant = {} ;
	$scope.wesApplicantID = 0;
	$scope.wesApplicant.ref_no = 0;
	$scope.webClient = {} ;

		$scope.wesAuthentication = function (WES_Ref) {
			// body...
							//window.sessionStorage.setItem('clientAuthURL', newValue);
			let clientAuthURL = window.sessionStorage.getItem('clientAuthURL');

// 			if ($scope.clientID != null ) {

// 					WebClient.getOneWebServices($scope.clientID).then(function(response) {
// 					// body...
// 					$scope.webServiceSelected = response.data.data;
// 					console.log($scope.webServiceSelected);

// 					$scope.$watch('webServiceSelected', function(newValue, oldValue){
// 						$scope.webClient =  newValue ;
// 						//window.localStorage.setItem('currentMData', newValue);
// 					})
// 				})
					
// 			} else {
// 				alert("Please select a web service to use");
// 			};
// console.log($scope.webClient);

			var ref_no  = WES_Ref;
			let token = window.sessionStorage.getItem('token');
			console.log($scope.clientSelected);
//url: "http://localhost:5000/applicants.json",
		$http({
			method: 'GET',
			url: clientAuthURL,
			headers: {
						Authorization :`Bearer ${token.replace("\"", "")}`,
						Content_Type :  'application/json'
					},
			params: { "ref_no": ref_no} 
			})
		  .then(function(response) {
		  	// body...
		  	$scope.wesApplicant = response.data;
		  	if ($scope.wesApplicant != null) {
			  	
			  	//console.log($scope.wesApplicant);
			  	$scope.wesApplicantID = $scope.wesApplicant.id;

			  	} else {
		  		alert("Candidate's Records with "+ ref_no+ " could not be fetched from WES");
		  	}

		  }, function(response) {
		  	// body...
		  	alert("WES Server not available , please try later " + response.status);
		  });

		}

	 $scope.selectConfirm  = {};
	// $scope.wesApplicantID = 0;
	// $scope.wesApplicant.ref_no = 0;
		$scope.generateConfirmation = function(confirm) {
			// body...	
			if (confirm.WES_Ref == $scope.wesApplicant.ref_no ) {

			$scope.selectConfirm = confirm; 

			//console.log($scope.selectConfirm);
			$scope.wesApplicantID = $scope.wesApplicant.id;
			$scope.printConfirmation($scope.selectConfirm, $scope.wesApplicantID );

			}
			else{
				alert("Please Confirm Candidate's WES Details to proceed");
			} 

			// $scope.selectConfirm = confirm; 
			// $scope.selectConfirm = confirm; 

			// console.log($scope.selectConfirm);
			// $scope.printConfirmation($scope.selectConfirm);
		}


		//////////////////////////////////

		$scope.form=[];
    	$scope.files=[];
		$scope.SendToCarrier = function(){

			let token = window.sessionStorage.getItem('token');
			let clientSubmitURL = window.sessionStorage.getItem('clientSubmitURL');
			$scope.photo=$scope.files[0];
			
			//console.log($scope.form.photo);

			//url: "http://localhost:5000/documents.json",
			
			$http({
				method:'POST',
				url: clientSubmitURL,
				data : $scope.form,
				processData:false,
				transformRequest:function(data){
					var formData = new FormData();
					formData.append("document", $scope.photo);
					formData.append("refnumber", $scope.wesApplicant.ref_no);
					formData.append("filetype", 'PDF');
					formData.append("applicant_id", $scope.wesApplicantID);
					


			      return formData;
			      return $scope.wesApplicant.ref_no;
			      return $scope.filetype;
			      return $scope.wesApplicantID;  
			  },  
			  
			  headers: {
					Authorization :`Bearer ${token.replace("\"", "")}`,	
					'Content-Type': undefined
				},
		   }).success(function(data){
		        alert("PDF submission to WES  was successful ");
		        console.log(data);
		        
		   });
		   
		};
			$scope.uploadedFile=function(element)
			{
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




		////////////////////////////////////



$scope.BlobPdfFile = {};
	// $scope.uploadFileToUrl = function(BlobPdfFile){

	// 	$scope.BlobPdfFile = BlobPdfFile;
	// 	console.log($scope.BlobPdfFile);
	// 	var fd = new FormData();
 //        fd.append("pdfFile" , $scope.BlobPdfFile);
	// 		console.log( fd);
	// 	let token = window.sessionStorage.getItem('token');

	// 	$http({
	// 		method: 'POST',
	// 		url: "http://localhost:5000/applicants/"+$scope.wesApplicantID+".json",
	// 		data : { fd},
	// 		transformRequest: angular.identity,  
	// 		headers: {
	// 				Authorization :`Bearer ${token.replace("\"", "")}`,	
	// 				'Content-Type': undefined
	// 			},
	// 	})

	// 		// $http.get("http://localhost:5000/applicants", 
	// 		// 		 {"params": { "ref_no": ref_no}})
	// 		.then(function(response) {
	// 		  	// body...
	// 		  	alert('PDF file was successfully sent');
	// 			  	console.log(response.data);
 //                }, function(response) {
	// 				  	// body...
	// 			  	alert(response.status);
	// 				  	console.log('There was an error with the file upload');
	//   		});
	// 	}



    // /*File UPload Functions*/
    // if (window.sessionStorage.getItem('token') != null) {
    // 	let token = window.sessionStorage.getItem('token');
    // } else {
    // 	let token = '111/111';
    // }

   
    // var headers = {

    //     'Authorization' :`Bearer ${token.replace("\"", "")}`,
    //     'Content-Type': undefined
    // };

    // var uploader = $scope.uploader = new FileUploader({
    //     url: "http://localhost:5000/documents.json",
    //     headers: headers,
    //     transformRequest: angular.identity,
    //     method: 'POST'
    // });

    // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
    //     console.info('onWhenAddingFileFailed', item, filter, options);
    // };
    // uploader.onAfterAddingFile = function(fileItem) {
    //     console.info('onAfterAddingFile', fileItem);
    // };
    // uploader.onAfterAddingAll = function(addedFileItems) {
    //     console.info('onAfterAddingAll', addedFileItems);
    // };
    // uploader.onBeforeUploadItem = function(item) {
    //     console.info('onBeforeUploadItem', item);
    //     item.formData.push(headers);
    //     item.formData.push({"filetype": "PDF", "applicant_id": $scope.wesApplicantID, "refnumber": $scope.wesApplicant.ref_no});
    //     console.log(item.file);
    //     Array.prototype.push.apply(item.formData, uploader.formData, item.file);
    // };
    // // uploader.onBeforeUploadItem = function(item) {
    // //   console.info('onBeforeUploadItem', item);
    // // };

    // uploader.onProgressItem = function(fileItem, progress) {
    //     console.info('onProgressItem', fileItem, progress);
    // };
    // uploader.onProgressAll = function(progress) {
    //     console.info('onProgressAll', progress);
    // };
    // uploader.onSuccessItem = function(fileItem, response, status, headers) {
    //     console.info('onSuccessItem', fileItem, response, status, headers);
    // };
    // uploader.onErrorItem = function(fileItem, response, status, headers) {
    //     console.info('onErrorItem', fileItem, response, status, headers);
    // };
    // uploader.onCancelItem = function(fileItem, response, status, headers) {
    //     console.info('onCancelItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteItem = function(fileItem, response, status, headers) {
    //     console.info('onCompleteItem', fileItem, response, status, headers);
    // };
    // uploader.onCompleteAll = function() {
    //     console.info('onCompleteAll');
    // };

    // console.info('uploader', uploader);

    // /*Actually upload a file*/
    // $scope.uploader.uploadAll();
    // /*End of file upload*/

// $scope.uploader = new FileUploader({
// 		url: "http://localhost:5000/documents.json",
// 		headers: {Authorization :`Bearer ${token.replace("\"", "")}`},
// 	);

//         $scope.uploadFile = function(){
// 	        var file = $scope.myFile;
// 	        console.log('file is ' );
// 	        console.dir(file);
// 	        var uploadUrl = "http://localhost:5000/documents.json";
// 	       new fileUpload.uploadFileToUrl(file, uploadUrl, $scope.wesApplicant.ref_no );
// 	    };


// 	    tokenHeader = 'Bearer ' + authData.token;
// 			var uploader = $scope.uploader = new FileUploader({
// 			    headers: { "Authorization": tokenHeader },
// 			    url: _uploadUrl,
// 			    withCredentials: true
// 			 });


	   



		  ///////////////////////////////////


					

    	// ............................Select Confirmation Details...............................................

    	$scope.selectConfirm  = {};
    		$scope.clickConfirm = function(confirm){
    		$scope.selectConfirm = confirm;    			

    	};

    	// ............................Select Confirmation For Edit...............................................

    		$scope.editConfirm = {};
    		$scope.clickedEdit = function(confirm){
    			$scope.editConfirm = confirm;
    		};

    		$scope.UpdateConfirm = function(){
    			$http({
    				method: 'PUT',
					url: "/confirmations/"+ $scope.editConfirm.id +".json",
					data: angular.toJson($scope.editConfirm) ,
					header: {
						'Content_Type' : 'application/json'
					}
    			}).then(function(response){
    							alert('confirmation was Updated successfully.');
							    $scope.closeModal('#myModalEdit');
							    $scope.getAllConfirmation();

    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
    		}


//..........................................Save new Confirmation..............................................
    	//  Save a New Confirmation..........

    	let idYear = $window.sessionStorage.getItem('yearID');

    	//console.log(idYear);

    	//.......................


  		let idDiet = $window.sessionStorage.getItem('examID');

   	    //console.log(idDiet);

    	
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
   	   $scope.getConfirmType();

   	   //----------- Populating Country's Drop-down from the return id
   	   // ---- $scope.applicant.confirm_type_id Using GET and Param 

   	 $scope.GetCountries = function (countryId) {
     var countryId = $scope.result.confirm_type_id;
     if (countryId) {
     			$http.get("/confirm_countries.json", 
				   {"params": { "confirm_type_id": countryId}}
					).then(function(response){ 
						$scope.countries = response.data;
		             //console.log(response.data);
		         },function (response) {
		             alert('Unexpected Error');
		         });
     }
     else {
        alert('Please Select Confirmation type.');
     }
 }

 
			
 $scope.hisHers = function(sex){

 	switch(sex){
 		case 'Male':
 		return  "his";
 		break;

 		case 'Female':
 		return 'her';
 		break;
 	}
 };

  $scope.heShes = function(sex){

 	switch(sex){
 		case 'Male':
 		return  "he";
 		break;

 		case 'Female':
 		return 'she';
 		break;
 	}
 };


 	$scope.subjOrdinal = function(numb){

		switch(numb){
			case 0 :
			return "ZERO";
			break;
			case 1 :
			return "ONE";
			break;
			case 2 :
			return "TWO";
			break;
			case 3 :
			return "THREE";
			break;
			case 4 :
			return "FOUR";
			break;
			case 5 :
			return "FIVE";
			break;
			case 6 :
			return "SIX";
			break;
			case 7 :
			return "SEVEN";
			break;
			case 8 :
			return "EIGHT";
			break;
			case 9 :
			return "NINE";
			break;
		}

	};
 	


	$scope.gradeIntepretation = function(grade){

		switch(grade){
			case "A1" :
			return "EXCELLENT";
			break;
			case "B2" :
			return "VERY GOOD";
			break;
			case "B3" :
			return "GOOD";
			break;
			case "C4" :
			return "CREDIT";
			break;
			case "C5" :
			return "CREDIT";
			break;
			case "C6" :
			return "CREDIT";
			break;
			case "D7" :
			return "PASS";
			break;
			case "E8" :
			return "PASS";
			break;
			case "F9" :
			return "FAIL";
			break;
			case "X" :
			return "ABSENT";
			break;
			case "*" :
			return "PENDING";
			break;
			case "$" :
			return "CANCELLED";
			break;
			case "H" :
			return  "WITHHELD";
			break;
		}

	}


//$scope.binaryData = [];
//$scope.BlobPdfFile = {};

      // if (userSession.getCookieData() != null) {
      //   var encodedString = atob(userSession.getCookieData()); 
      //     //console.log( JSON.parse(encodedString));
      //             vm.usrSecond = JSON.parse(encodedString) ;
      //             //console.log(vm.usrSecond);
      //     }

$scope.printConfirmation1 = function(selectConfirm, wesApplicantID){
//console.log(selectConfirm);
$scope.selectConfirm = selectConfirm;  
	let base64Pdf;

	$scope.signatory = [];
	$scope.second_signatory = [];
	$http.get("/users/permitted_users").then(function(response){
		// body...
		//debugger
		$scope.signatory  = response.data;
		//console.log($scope.signatory);

		if( userSession.getCookieData() == null) {
		//if( $window.localStorage.getItem('signatory2') == null) {
		//if( ($scope.signatory[0]== null) || ($scope.signatory[1] == null)) {
			if (confirm("Sorry!, You Can Not Print Right Now, You Need A Second Signatory Or An AR To Effect Printing. \n Click OK to continue or CANCEL to abort") == true) {
					$window.open('#/log_in');
				}
			else{
				alert('Operation cancelled');
				//$route.reload(); or 
				window.location.reload();
					$location.path('/confirmations');
			}
		} 
		else {

				$scope.second_signatory = [];

				var encodedString = atob(userSession.getCookieData()); 
		          //console.log( JSON.parse(encodedString));
		         $scope.usrSecond = JSON.parse(encodedString) ;
		          //console.log(vm.usrSecond);
		// vm.second2 = {
  //           surname: response.data.logUser.surname,
  //           othernames: response.data.logUser.othernames.slice(0,1),
  //           userID: response.data.logUser.email
  //         }

  			$scope.userID = $scope.usrSecond.userID;

				//$scope.second_signatory = JSON.parse($window.localStorage.getItem('signatory2'));
				//console.log($scope.second_signatory);
				
				// if ( $scope.signatory[0]== null) {
				// 	    $scope.signatory[0] = $scope.second_signatory[0];
				// 	    //console.log($scope.signatory[0]);
					     
					
				// } else {
				// 	$scope.signatory[1] = $scope.second_signatory[1];
				// 	//console.log($scope.signatory[1]);
				// }

				

			$scope.$watch('selectConfirm', function(newValue, oldValue){
	
				// NOTE THE 'newValue' REPRESENT THE MODEL 'selectConfirm' under watch.
		
		
				//console.log(selectConfirm);
				console.log(newValue);
				  var date = new Date();
				console.log(date.toDateString());
				var nowDate = date.toDateString();
				
		
				 $scope.resultDetail = [];
				 var pdfResult = [];
		
				 var dayday ;
		
			

		
	ResultService.ResultDetailsFromDB(newValue.exam_no, newValue.YearName, newValue.DietName)
						.then(function(response){
								$scope.resultDetail = response.data[0];
								//console.log($scope.resultDetail);
		
						
							$scope.$broadcast('print',{
							retResult: $scope.resultDetail
						});
								
								
							}, function(response){
								alert('There was an error from reading Result for Printing');
							});
		
													  
			$scope.$on('print', function(event, obj) {
		
			// body...
					$scope.resultDetail = obj.retResult;
		
					let signatory = [];
					console.log($scope.userID);
					debugger
					$http.get("/users/permitted_users",{"params": { "email": $scope.userID}} ).then(function(response){
						// body...
						$scope.signatory  = response.data;
						//console.log(signatory[0]);
						console.log($scope.signatory);
							// 					$scope.$watch('signatory', function(newValue, oldValue){
							// 	window.sessionStorage.setItem('yearID', newValue);
							// 	//window.localStorage.setItem('currentMData', newValue);
							// })

							var docDefinition = {
								background: [
										   {
										       image: 'data:image/gif;base64,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wS2LVeiZhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACE4FAEHevFm7ybNQqAKeoS7VC/yrrw0Lu4PQr6dF5kuT0zmvRSsZM2wMCmAtABQAUAFABQAUAFAEcyb4yKAMiMmObHocVjVjeJSNEnKZry7WZaKtlzdOa9akvdM5bmpWggoAKACgAoAKACgBrrvUigDDuIzBORjg0mroZes5t6bSeRXnV6fK7opFmsE2MZJ0yO1XTdpAWEOVBr1jMdQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADXOFqKkuWLY0Q14xoIxwCT2oSvoBj3TmWbAr1aMOVWJkzV06LZED610GZcpDCgAoAKACgAoAKACgBD0oAybxPLnyD1pSV0NE6Put68yUbVDRbDNNGZGJ9a9KGiMnuadUAUAFABQAUAFABQAUAU9Qg8yIsOooAzYJDHID6cVlUgmikaqMHUEV5ck4uxQrDINUtwH25zEPavVg7xTIe5LVCCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAjlPGK58S7U2VHcjryyyveS+XFgdTW1CHNK4GfaRmWbOOM16sVYyZvIoVQBTAdQAUAFABQAUAFABQAUAFAFPUUzFuHagCpBJhGBPb865asfeuWixpg+UmuiOxD3L9UAUAFABQAUAFACd6TvcBaYCEZGKAMW9gMMxYcKetDGieymz8hP0rgxNPS6KRd7VzLcYW5wWX0NelQd4IiW5PWwgoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIpeoFcOLeyLiMrgKMq/l3ybR9K9LDwtEmTLumQbU3kV1kGhQAUAFABQAUAFABQAUAFABQAyZN8ZFAGI2Y2I7DiomrjRo6YP3P1q1sIu0AFABQAUAFABQAUAFABQBXvIBNERjmgDHQmKTHdT+dTON0NGtDIJEBzXmTjyysWOi4mPuK68M9GTIn711Ei0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACZ+bGOPWgBaACgAoAKACgAoAKACgAoAKACgCF/vV5uLd52LjsQ3D+XETWFOPNKxRkxKZp/xr14KyM2zehQRxgCqESUAFABQAUAFABQAUAFABQAUAFAGNqEeyUnHWiwy/p64gH9KBFqgAoAKACgAoAKACgAoAKACgDJ1KDY/mLxTAbZTYbb2PT2rjxFO6uWi/nEqn161GHl71gktCzXcQFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBATlia8itLmmzRbGdqMvRR2row0OrBuw/S4Pm3HtXfYzNWgAoAKACgAoAKACgAoAKACgAoAKAKd/FvUY60wJrVdsIpATUAFABQAUAFABQAUAFABQAUARzxiSMqaAMMgxSlT2PHvSkroZpJJvjVhyQea4YrkqF7ouqcgGu8zFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAQnApPYCtI2xGb0rx7c07GpjuTNcfU16tONlYhs3LSPy4QO/etCSagAoAKACgAoAKACgAoAKACgAoAKAEIz1oAWgAoAKACgAoAKACgAoAKACgAoAKAM7U7fI8xeopgVrSUj5egPT2rnrQ6lI1oG3RA1sndEklMAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBrnC1nVdoNjW5n38uyLb0zXDh4XdzR7FXT4TJKG9DXpLYyZtgYGKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIodCp70AYkyGC4PXk0NXQzUsX3w5zUwVlYTLNUAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBHKcCubFO0LFR3MW9k3zkA/lRQhaKHI0tOhEcQbueldJmXKBhQAUAFABQAUAFABQAhIHU0ALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFLUbfzI9w6imA3SydrKTSAv0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAV7t9kZPtXLX1aiXEx7ZDNcZPrXRFWRL1N5F2qBVCHUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAjDcMUAQwweVIxHQ9qAJ6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAMzVnIAUdDWDV6ha2F0uJSu4jJ6it+hFzSoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9k=',
											   opacity: 0.2,
											   margin: [5, 220] ,
											   alignment: 'center',
										       width: 500
										   },
										   {
									            text: newValue.receipt_no,
									            	   opacity: 0.2,
									            	   alignment: 'center',
									            	   color: 'grey',
									            absolutePosition: {x: -50, y: 290}
										    }
										 ],
								content: [
									{
										text:' THE WEST AFRICAN EXAMINATIONS COUNCIL\n', style: 'header',
									},
									{
										columns: [
											{
												 fit: [80, 70],
												 image: 'data:image/gif;base64,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wS2LVeiZhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACE4FAEHevFm7ybNQqAKeoS7VC/yrrw0Lu4PQr6dF5kuT0zmvRSsZM2wMCmAtABQAUAFABQAUAFAEcyb4yKAMiMmObHocVjVjeJSNEnKZry7WZaKtlzdOa9akvdM5bmpWggoAKACgAoAKACgBrrvUigDDuIzBORjg0mroZes5t6bSeRXnV6fK7opFmsE2MZJ0yO1XTdpAWEOVBr1jMdQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADXOFqKkuWLY0Q14xoIxwCT2oSvoBj3TmWbAr1aMOVWJkzV06LZED610GZcpDCgAoAKACgAoAKACgBD0oAybxPLnyD1pSV0NE6Put68yUbVDRbDNNGZGJ9a9KGiMnuadUAUAFABQAUAFABQAUAU9Qg8yIsOooAzYJDHID6cVlUgmikaqMHUEV5ck4uxQrDINUtwH25zEPavVg7xTIe5LVCCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAjlPGK58S7U2VHcjryyyveS+XFgdTW1CHNK4GfaRmWbOOM16sVYyZvIoVQBTAdQAUAFABQAUAFABQAUAFAFPUUzFuHagCpBJhGBPb865asfeuWixpg+UmuiOxD3L9UAUAFABQAUAFACd6TvcBaYCEZGKAMW9gMMxYcKetDGieymz8hP0rgxNPS6KRd7VzLcYW5wWX0NelQd4IiW5PWwgoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIpeoFcOLeyLiMrgKMq/l3ybR9K9LDwtEmTLumQbU3kV1kGhQAUAFABQAUAFABQAUAFABQAyZN8ZFAGI2Y2I7DiomrjRo6YP3P1q1sIu0AFABQAUAFABQAUAFABQBXvIBNERjmgDHQmKTHdT+dTON0NGtDIJEBzXmTjyysWOi4mPuK68M9GTIn711Ei0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACZ+bGOPWgBaACgAoAKACgAoAKACgAoAKACgCF/vV5uLd52LjsQ3D+XETWFOPNKxRkxKZp/xr14KyM2zehQRxgCqESUAFABQAUAFABQAUAFABQAUAFAGNqEeyUnHWiwy/p64gH9KBFqgAoAKACgAoAKACgAoAKACgDJ1KDY/mLxTAbZTYbb2PT2rjxFO6uWi/nEqn161GHl71gktCzXcQFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBATlia8itLmmzRbGdqMvRR2row0OrBuw/S4Pm3HtXfYzNWgAoAKACgAoAKACgAoAKACgAoAKAKd/FvUY60wJrVdsIpATUAFABQAUAFABQAUAFABQAUARzxiSMqaAMMgxSlT2PHvSkroZpJJvjVhyQea4YrkqF7ouqcgGu8zFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAQnApPYCtI2xGb0rx7c07GpjuTNcfU16tONlYhs3LSPy4QO/etCSagAoAKACgAoAKACgAoAKACgAoAKAEIz1oAWgAoAKACgAoAKACgAoAKACgAoAKAM7U7fI8xeopgVrSUj5egPT2rnrQ6lI1oG3RA1sndEklMAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBrnC1nVdoNjW5n38uyLb0zXDh4XdzR7FXT4TJKG9DXpLYyZtgYGKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIodCp70AYkyGC4PXk0NXQzUsX3w5zUwVlYTLNUAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBHKcCubFO0LFR3MW9k3zkA/lRQhaKHI0tOhEcQbueldJmXKBhQAUAFABQAUAFABQAhIHU0ALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFLUbfzI9w6imA3SydrKTSAv0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAV7t9kZPtXLX1aiXEx7ZDNcZPrXRFWRL1N5F2qBVCHUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAjDcMUAQwweVIxHQ9qAJ6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAMzVnIAUdDWDV6ha2F0uJSu4jJ6it+hFzSoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9k=',
												  width: 200
												//image: 'image/waec.jpeg'
											},
											
											{    
													alignment: 'right',
												   // width: 100,
												   stack:[
						
														  '21, HUSSEY STREET,',
														  'PRIVATE MAIL BAG 1022,',
														  'YABA, LAGOS, NIGERIA.',
														   'TEL: 01-8961016',
														 ]
											}
												
															  
															  
										]
									},
									{
										 margin:[0,-5],
										canvas: [
						
													{
														type: 'line',
														x1: -10, y1: 8,
														x2: 530, y2: 8,
														//lineWidth: 3
													},
												]
									},
									{
									  fontSize: 11,
									  margin:[0,8,0,-3],
									  columns: [
						
												  {
													text: newValue.ref_no, alignment:'left', bold: true
												  },
						
												  {
													text: 'CONFIDENTIAL', bold: true, alignment: 'center', fontSize:14, decoration: 'underline'
												  },
						
						
												  {
													text: nowDate, alignment: 'right'
												  }
						
											]
									},
									{
									  margin:[0,8,0,5],
									  fontSize: 11,
										bold:true,
									  columns:[
						
												[
												  {text: newValue.dest_title},
												  {text: newValue.dest_address1},
												  {text: newValue.dest_address2},
												  {text: newValue.dest_location}
												],
						
											  
											  //alignment: 'left',
												  { 
													  alignment: 'right',
													  columnGap: 300,
													  fit: [110, 90],
													  width: 150,
													  height: 150,		
													  image: 'data:image/jpg;base64,'+$scope.resultDetail.Picture, 
												  },
											  
										  ]
									},
						
									{
										text:' CONFIRMATION OF RESULT\n',bold: true, alignment: 'center', fontSize:14, decoration: 'underline'
									},
						
									{
									   margin:[0,7,0,5],
										//columnGap: 20,
										fontSize: 11,
										bold:true,
									  columns:[ 
												{ 
												  width: 150,
						
											   text: [
												  {text: 'NAME OF EXAM:\n'},
												  {text: 'NAME OF SCHOOL:\n'},
												  {text: 'CANDIDATE\'S NUMBER:\n'},
												  {text: 'CANDIDATE\'S NAME:\n'},
												  {text: 'ADDRESS:\n'},
												  {text: 'SEX:\n'},
												  {text: 'DATE OF BIRTH:\n'}
												]
											  },
												{
						//`${subHeading}\n\n`
												  text:[
																		  {text: $scope.resultDetail.ExamDiet+' '+ $scope.resultDetail.ExamYear+'\n'},
																		  {text: $scope.resultDetail.CentreName+'\n'},
																		  {text: $scope.resultDetail.CandNo+'\n'},
																		  {text: $scope.resultDetail.CandName+'\n'},
																		  {text: newValue.Cand_address+'\n'},
																		  {text: $scope.resultDetail.Sex+'\n'},
																		  {text: $scope.resultDetail.DOB+'\n'}
																		]
																	  },
						
									  ]
									},
						
									{
									  margin:[0,5,0,5],
									  fontSize: 11,
									   text:[
											  {text:'Please find forwarded to you the confirmation result of the above named candidate.\n' },
											   'The details of ', {text:  $scope.hisHers($scope.resultDetail.Sex), bold:true},' performance at the examination are as follows.'
										]
									},
						
									  {
										
									  columns: [
										  { width: '*', text: '' },
										  {
											  width: 'auto',
											  fontSize:10,
											  bold: true,
												//widths: ['*', '*', '*'],
						
												  table: {
						
						
														  body: [
																   [
																	{text:'', margin:[90,0,60,0], alignment:'left'}, 
																	{text:'', margin:[30,0,60,0], alignment:'left'}, 
																	{text:''}
																  ], 
																  [
																	{text:'SUBJECT', decoration:'underline', alignment:'left'}, 
																	{text:'GRADE', decoration:'underline', alignment:'left'}, 
																	{text:'INTERPRETATION', decoration:'underline'}
																  ],
																  [{text:$scope.resultDetail.Subject1}, {text:$scope.resultDetail.Grade1}, {text: $scope.gradeIntepretation( $scope.resultDetail.Grade1)}],
																  [{text:$scope.resultDetail.Subject2}, {text:$scope.resultDetail.Grade2}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade2)}],
																  [{text:$scope.resultDetail.Subject3}, {text:$scope.resultDetail.Grade3}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade3)}],
																  [{text:$scope.resultDetail.Subject4}, {text:$scope.resultDetail.Grade4}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade4)}],
																  [{text:$scope.resultDetail.Subject5}, {text:$scope.resultDetail.Grade5}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade5)}],
																  [{text:$scope.resultDetail.Subject6}, {text:$scope.resultDetail.Grade6}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade6)}],
																  [{text:$scope.resultDetail.Subject7}, {text:$scope.resultDetail.Grade7}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade7)}],
																  [{text:$scope.resultDetail.Subject8}, {text:$scope.resultDetail.Grade8}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade8)}],
																  [{text:$scope.resultDetail.Subject9}, {text:$scope.resultDetail.Grade9}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade9)}],
																  [{text:'NO OF SUBJECTS LISTED:', margin:[0,10,0,0]}, {text: $scope.subjOrdinal($scope.resultDetail.NoOfSubjects)+' (' + $scope.resultDetail.NoOfSubjects+')', margin:[0,10,0,0]}, {text:''}],
														  ]
												  },
												  layout: 'noBorders'
										  },
										  { width: '*', text: '' },
									  ]
								  },
						
								  {
									margin:[0,5,0,10],
									fontSize: 11,
									text: [   
											'You will have to satisfy yourself that ', 
											{text: $scope.heShes($scope.resultDetail.Sex ), bold:true}, ' and ',
											 {text:$scope.resultDetail.CandName.trim(), bold:true}, 
											 ' of our records are one and the same person.'
						
										  ]
								  },
						
								  {
									text: 'Certified by:'
								  },
						
								  {
									margin:[0,33,0,33],
									stack:[
										{text: $scope.signatory[0][0][1] + " "+ $scope.signatory[0][0][2]+ " " + "(" + $scope.signatory[0][0][0] +")" , bold:true},
										//{text:'ADEKUNLE R.O. (MRS)', bold:true},
										{text: 'RESULTS OFFICER'},
									]
								  },
						
								  {
									margin:[0,2,0,17],
									stack:[
										{text: $scope.signatory[1][0][1] + " "+ $scope.signatory[1][0][2]+ " " + "(" + $scope.signatory[1][0][0] +")" , bold:true},
										//{text:'JOHN-NWAFA H.A. (MRS)', bold:true},
										{text: 'For: HEAD OF NATIONAL OFFICE'},
									]
								  },
						
								  {
									  margin:[0,-8,0,0],
									stack:[
						
									  {
										text: 'NOTE: ANY ALTERATION ON THIS SHEET RENDERS IT INVALID.', 
										bold: true,
										fontSize: 11,
										decoration: 'underline'
									  },
									  
									]
								  }
						
						
								],
						
						
								footer : function(currentPage, pageCount) {
								return {
									margin : [ 20,-8, 20,20],
									fontSize : 10,
						
						
										stack:[
												{
												  canvas: [
						
															  {
																  type: 'line',
																  x1: -10, y1: 8,
																  x2: 570, y2: 8,
																  //lineWidth: 3
															  },
														  ]
											  },
						
											  {
											  columns : [
																			{
																			   alignment : 'left',
																					  bold : true,
																				stack: [
						
																					{
																					  text : 'Patrick E. Areghan, FCGP' ,
																				 
																					},
																					{
																					  text:'Head of National Office'
																					}
						
																				]
																			},
																		   
																			{
																					  alignment : 'right',
																					  bold : true,
						
																				stack:[
						
																					{
																					  text : 'Email: hno@waecnigeria.org',
																					  
																					},
						
																					{
																					  text: 'Websites: waecnigeria.org, www.waecdirect.org, www.waeconline.org.ng'
																					},
																				]
																			} 
						
																		]
											}
										]                            
								};
							},
						
						  //   header: function(currentPage, pageCount, pageSize) {
						  //   // you can apply any logic and return any valid pdfmake element
						
						  //   return [
						  //     { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
						  //     { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
						  //   ]
						  // },
								styles: {
									header: {
										fontSize: 20,
										bold: true,
										alignment: 'center',
										margins: [20,10,20,10],
										width: 'auto'
									}
								}
							};
						
							 //pdfMake.createPdf(docDefinition).open();
							 //pdfMake.createPdf(docDefinition).open(newValue.ref_no+'.pdf');
							 pdfMake.createPdf(docDefinition).download(newValue.WES_Ref+'.pdf');
							  //pdfDocGenerator.download(newValue.WES_Ref+'.pdf');
							  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
								var data;
								//pdfMake.createPdf(docDefinition).getBuffer(function(buffer) {
								pdfDocGenerator.getBlob(function(blob) {
								    // turn buffer into blob
								    //data = buffer;
								    $scope.binaryData = blob;
								    //alert(data);
								   // console.log( $scope.binaryData);
								    	$scope.BlobPdfFile = ({
							                fileName: newValue.WES_Ref+'.pdf',
							                attachment: $scope.binaryData
							            });
//debugger
							            console.log( $scope.BlobPdfFile);
								});

							 pdfDocGenerator.getDataUrl((dataUrl) => {
								const targetElement = document.querySelector('#iframeContainer');
								const iframe = document.createElement('iframe');
								iframe.src = dataUrl;
								iframe.width = "100%";
                                iframe.height = "600px";
								targetElement.appendChild(iframe);

								var x = document.createElement("INPUT");
									  x.setAttribute("type", "file");
									  x.setAttribute("value", newValue.WES_Ref+'.pdf');
									  x.name = input.name;
									  targetElement.appendChild(x);
								var y = document.createElement("INPUT");
									  y.setAttribute("type", "text");
									  y.setAttribute("disabled", "true");
									  y.setAttribute("value", newValue.WES_Ref+'.pdf');
									  targetElement.appendChild(y);

							});

							
							


					}, function() {
						// body...
						alert("Error getting the signatories");
					});

					// $scope.$on('sign', function(event, obj){
					// 	$scope.signatory = obj.retSignatories;
					// };
		
					//console.log(signatory);
		
					//console.log($scope.resultDetail.CentreName);
		

		
			});
		
				});



		};


			// 	$scope.$watch('signatory', function(newValue, oldValue){
			// 	window.sessionStorage.setItem('signatory', newValue);
			// 	//window.localStorage.setItem('currentMData', newValue);
			// });

					
	}, function() {
		// body...
		alert("Error getting the signatories");
	});

	//console.log($scope.signatory.length);

	
	};

	//console.log($scope.binaryData);

$scope.printConfirmation = function(selectConfirm, wesApplicantID){
//console.log(selectConfirm);
$scope.selectConfirm = selectConfirm;  
	let base64Pdf;

	$scope.signatory = [];
	$scope.second_signatory = [];
	$http.get("/users/permitted_users").then(function(response){
		// body...
		//debugger
		$scope.signatory  = response.data;
		//console.log($scope.signatory);

		if( userSession.getCookieData() == null) {
		//if( $window.localStorage.getItem('signatory2') == null) {
		//if( ($scope.signatory[0]== null) || ($scope.signatory[1] == null)) {
			if (confirm("Sorry!, You Can Not Print Right Now, You Need A Second Signatory Or An AR To Effect Printing. \n Click OK to continue or CANCEL to abort") == true) {
					$window.open('#/log_in');
				}
			else{
				alert('Operation cancelled');
				//$route.reload(); or 
				window.location.reload();
					$location.path('/confirmations');
			}
		} 
		else {

				$scope.second_signatory = [];

				var encodedString = atob(userSession.getCookieData()); 
		          //console.log( JSON.parse(encodedString));
		         $scope.usrSecond = JSON.parse(encodedString) ;
		          //console.log(vm.usrSecond);
		// vm.second2 = {
  //           surname: response.data.logUser.surname,
  //           othernames: response.data.logUser.othernames.slice(0,1),
  //           userID: response.data.logUser.email
  //         }

  			$scope.userID = $scope.usrSecond.userID;

				//$scope.second_signatory = JSON.parse($window.localStorage.getItem('signatory2'));
				//console.log($scope.second_signatory);
				
				// if ( $scope.signatory[0]== null) {
				// 	    $scope.signatory[0] = $scope.second_signatory[0];
				// 	    //console.log($scope.signatory[0]);
					     
					
				// } else {
				// 	$scope.signatory[1] = $scope.second_signatory[1];
				// 	//console.log($scope.signatory[1]);
				// }

				

			$scope.$watch('selectConfirm', function(newValue, oldValue){
	
				// NOTE THE 'newValue' REPRESENT THE MODEL 'selectConfirm' under watch.
		
		
				//console.log(selectConfirm);
				console.log(newValue);
				  var date = new Date();
				console.log(date.toDateString());
				var nowDate = date.toDateString();
				
		
				 $scope.resultDetail = [];
				 var pdfResult = [];
		
				 var dayday ;
		
			

		
	ResultService.ResultDetailsFromDB(newValue.exam_no, newValue.YearName, newValue.DietName)
						.then(function(response){
								$scope.resultDetail = response.data[0];
								//console.log($scope.resultDetail);
		
						
							$scope.$broadcast('print',{
							retResult: $scope.resultDetail
						});
								
								
							}, function(response){
								alert('There was an error from reading Result for Printing');
							});
		
													  
			$scope.$on('print', function(event, obj) {
		
			// body...
					$scope.resultDetail = obj.retResult;
		
					let signatory = [];
					console.log($scope.userID);
					debugger
					$http.get("/users/permitted_users",{"params": { "email": $scope.userID}} ).then(function(response){
						// body...
						$scope.signatory  = response.data;
						//console.log(signatory[0]);
						console.log($scope.signatory);
							// 					$scope.$watch('signatory', function(newValue, oldValue){
							// 	window.sessionStorage.setItem('yearID', newValue);
							// 	//window.localStorage.setItem('currentMData', newValue);
							// })

							var docDefinition = {
								background: [
										   {
										       image: 'data:image/gif;base64,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wS2LVeiZhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACE4FAEHevFm7ybNQqAKeoS7VC/yrrw0Lu4PQr6dF5kuT0zmvRSsZM2wMCmAtABQAUAFABQAUAFAEcyb4yKAMiMmObHocVjVjeJSNEnKZry7WZaKtlzdOa9akvdM5bmpWggoAKACgAoAKACgBrrvUigDDuIzBORjg0mroZes5t6bSeRXnV6fK7opFmsE2MZJ0yO1XTdpAWEOVBr1jMdQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADXOFqKkuWLY0Q14xoIxwCT2oSvoBj3TmWbAr1aMOVWJkzV06LZED610GZcpDCgAoAKACgAoAKACgBD0oAybxPLnyD1pSV0NE6Put68yUbVDRbDNNGZGJ9a9KGiMnuadUAUAFABQAUAFABQAUAU9Qg8yIsOooAzYJDHID6cVlUgmikaqMHUEV5ck4uxQrDINUtwH25zEPavVg7xTIe5LVCCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAjlPGK58S7U2VHcjryyyveS+XFgdTW1CHNK4GfaRmWbOOM16sVYyZvIoVQBTAdQAUAFABQAUAFABQAUAFAFPUUzFuHagCpBJhGBPb865asfeuWixpg+UmuiOxD3L9UAUAFABQAUAFACd6TvcBaYCEZGKAMW9gMMxYcKetDGieymz8hP0rgxNPS6KRd7VzLcYW5wWX0NelQd4IiW5PWwgoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIpeoFcOLeyLiMrgKMq/l3ybR9K9LDwtEmTLumQbU3kV1kGhQAUAFABQAUAFABQAUAFABQAyZN8ZFAGI2Y2I7DiomrjRo6YP3P1q1sIu0AFABQAUAFABQAUAFABQBXvIBNERjmgDHQmKTHdT+dTON0NGtDIJEBzXmTjyysWOi4mPuK68M9GTIn711Ei0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACZ+bGOPWgBaACgAoAKACgAoAKACgAoAKACgCF/vV5uLd52LjsQ3D+XETWFOPNKxRkxKZp/xr14KyM2zehQRxgCqESUAFABQAUAFABQAUAFABQAUAFAGNqEeyUnHWiwy/p64gH9KBFqgAoAKACgAoAKACgAoAKACgDJ1KDY/mLxTAbZTYbb2PT2rjxFO6uWi/nEqn161GHl71gktCzXcQFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBATlia8itLmmzRbGdqMvRR2row0OrBuw/S4Pm3HtXfYzNWgAoAKACgAoAKACgAoAKACgAoAKAKd/FvUY60wJrVdsIpATUAFABQAUAFABQAUAFABQAUARzxiSMqaAMMgxSlT2PHvSkroZpJJvjVhyQea4YrkqF7ouqcgGu8zFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAQnApPYCtI2xGb0rx7c07GpjuTNcfU16tONlYhs3LSPy4QO/etCSagAoAKACgAoAKACgAoAKACgAoAKAEIz1oAWgAoAKACgAoAKACgAoAKACgAoAKAM7U7fI8xeopgVrSUj5egPT2rnrQ6lI1oG3RA1sndEklMAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBrnC1nVdoNjW5n38uyLb0zXDh4XdzR7FXT4TJKG9DXpLYyZtgYGKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIodCp70AYkyGC4PXk0NXQzUsX3w5zUwVlYTLNUAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBHKcCubFO0LFR3MW9k3zkA/lRQhaKHI0tOhEcQbueldJmXKBhQAUAFABQAUAFABQAhIHU0ALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFLUbfzI9w6imA3SydrKTSAv0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAV7t9kZPtXLX1aiXEx7ZDNcZPrXRFWRL1N5F2qBVCHUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAjDcMUAQwweVIxHQ9qAJ6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAMzVnIAUdDWDV6ha2F0uJSu4jJ6it+hFzSoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9k=',
											   opacity: 0.2,
											   margin: [5, 220] ,
											   alignment: 'center',
										       width: 500
										   },
										   {
									            text: newValue.receipt_no,
									            	   opacity: 0.2,
									            	   alignment: 'center',
									            	   color: 'grey',
									            absolutePosition: {x: -50, y: 290}
										    }
										 ],
								content: [
									{
										text:' THE WEST AFRICAN EXAMINATIONS COUNCIL\n', style: 'header',
									},
									{
										columns: [
											{
												 fit: [80, 70],
												 image: 'data:image/gif;base64,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wS2LVeiZhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACE4FAEHevFm7ybNQqAKeoS7VC/yrrw0Lu4PQr6dF5kuT0zmvRSsZM2wMCmAtABQAUAFABQAUAFAEcyb4yKAMiMmObHocVjVjeJSNEnKZry7WZaKtlzdOa9akvdM5bmpWggoAKACgAoAKACgBrrvUigDDuIzBORjg0mroZes5t6bSeRXnV6fK7opFmsE2MZJ0yO1XTdpAWEOVBr1jMdQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADXOFqKkuWLY0Q14xoIxwCT2oSvoBj3TmWbAr1aMOVWJkzV06LZED610GZcpDCgAoAKACgAoAKACgBD0oAybxPLnyD1pSV0NE6Put68yUbVDRbDNNGZGJ9a9KGiMnuadUAUAFABQAUAFABQAUAU9Qg8yIsOooAzYJDHID6cVlUgmikaqMHUEV5ck4uxQrDINUtwH25zEPavVg7xTIe5LVCCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAjlPGK58S7U2VHcjryyyveS+XFgdTW1CHNK4GfaRmWbOOM16sVYyZvIoVQBTAdQAUAFABQAUAFABQAUAFAFPUUzFuHagCpBJhGBPb865asfeuWixpg+UmuiOxD3L9UAUAFABQAUAFACd6TvcBaYCEZGKAMW9gMMxYcKetDGieymz8hP0rgxNPS6KRd7VzLcYW5wWX0NelQd4IiW5PWwgoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIpeoFcOLeyLiMrgKMq/l3ybR9K9LDwtEmTLumQbU3kV1kGhQAUAFABQAUAFABQAUAFABQAyZN8ZFAGI2Y2I7DiomrjRo6YP3P1q1sIu0AFABQAUAFABQAUAFABQBXvIBNERjmgDHQmKTHdT+dTON0NGtDIJEBzXmTjyysWOi4mPuK68M9GTIn711Ei0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACZ+bGOPWgBaACgAoAKACgAoAKACgAoAKACgCF/vV5uLd52LjsQ3D+XETWFOPNKxRkxKZp/xr14KyM2zehQRxgCqESUAFABQAUAFABQAUAFABQAUAFAGNqEeyUnHWiwy/p64gH9KBFqgAoAKACgAoAKACgAoAKACgDJ1KDY/mLxTAbZTYbb2PT2rjxFO6uWi/nEqn161GHl71gktCzXcQFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBATlia8itLmmzRbGdqMvRR2row0OrBuw/S4Pm3HtXfYzNWgAoAKACgAoAKACgAoAKACgAoAKAKd/FvUY60wJrVdsIpATUAFABQAUAFABQAUAFABQAUARzxiSMqaAMMgxSlT2PHvSkroZpJJvjVhyQea4YrkqF7ouqcgGu8zFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAQnApPYCtI2xGb0rx7c07GpjuTNcfU16tONlYhs3LSPy4QO/etCSagAoAKACgAoAKACgAoAKACgAoAKAEIz1oAWgAoAKACgAoAKACgAoAKACgAoAKAM7U7fI8xeopgVrSUj5egPT2rnrQ6lI1oG3RA1sndEklMAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBrnC1nVdoNjW5n38uyLb0zXDh4XdzR7FXT4TJKG9DXpLYyZtgYGKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIodCp70AYkyGC4PXk0NXQzUsX3w5zUwVlYTLNUAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBHKcCubFO0LFR3MW9k3zkA/lRQhaKHI0tOhEcQbueldJmXKBhQAUAFABQAUAFABQAhIHU0ALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFLUbfzI9w6imA3SydrKTSAv0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAV7t9kZPtXLX1aiXEx7ZDNcZPrXRFWRL1N5F2qBVCHUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAjDcMUAQwweVIxHQ9qAJ6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAMzVnIAUdDWDV6ha2F0uJSu4jJ6it+hFzSoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9k=',
												  width: 200
												//image: 'image/waec.jpeg'
											},
											
											{    
													alignment: 'right',
												   // width: 100,
												   stack:[
						
														  '21, HUSSEY STREET,',
														  'PRIVATE MAIL BAG 1022,',
														  'YABA, LAGOS, NIGERIA.',
														   'TEL: 01-8961016',
														 ]
											}
												
															  
															  
										]
									},
									{
										 margin:[0,-5],
										canvas: [
						
													{
														type: 'line',
														x1: -10, y1: 8,
														x2: 530, y2: 8,
														//lineWidth: 3
													},
												]
									},
									{
									  fontSize: 11,
									  margin:[0,8,0,-3],
									  columns: [
						
												  {
													text: newValue.ref_no, alignment:'left', bold: true
												  },
						
												  {
													text: 'CONFIDENTIAL', bold: true, alignment: 'center', fontSize:14, decoration: 'underline'
												  },
						
						
												  {
													text: nowDate, alignment: 'right'
												  }
						
											]
									},
									{
									  margin:[0,8,0,5],
									  fontSize: 11,
										bold:true,
									  columns:[
						
												[
												  {text: newValue.dest_title},
												  {text: newValue.dest_address1},
												  {text: newValue.dest_address2},
												  {text: newValue.dest_location}
												],
						
											  
											  //alignment: 'left',
												  { 
													  alignment: 'right',
													  columnGap: 300,
													  fit: [110, 90],
													  width: 150,
													  height: 150,		
													  image: 'data:image/jpg;base64,'+$scope.resultDetail.Picture, 
												  },
											  
										  ]
									},
						
									{
										text:' CONFIRMATION OF RESULT\n',bold: true, alignment: 'center', fontSize:14, decoration: 'underline'
									},
						
									{
									   margin:[0,7,0,5],
										//columnGap: 20,
										fontSize: 11,
										bold:true,
									  columns:[ 
												{ 
												  width: 150,
						
											   text: [
												  {text: 'NAME OF EXAM:\n'},
												  {text: 'NAME OF SCHOOL:\n'},
												  {text: 'CANDIDATE\'S NUMBER:\n'},
												  {text: 'CANDIDATE\'S NAME:\n'},
												  {text: 'ADDRESS:\n'},
												  {text: 'SEX:\n'},
												  {text: 'DATE OF BIRTH:\n'}
												]
											  },
												{
						//`${subHeading}\n\n`
												  text:[
																		  {text: $scope.resultDetail.ExamDiet+' '+ $scope.resultDetail.ExamYear+'\n'},
																		  {text: $scope.resultDetail.CentreName+'\n'},
																		  {text: $scope.resultDetail.CandNo+'\n'},
																		  {text: $scope.resultDetail.CandName+'\n'},
																		  {text: newValue.Cand_address+'\n'},
																		  {text: $scope.resultDetail.Sex+'\n'},
																		  {text: $scope.resultDetail.DOB+'\n'}
																		]
																	  },
						
									  ]
									},
						
									{
									  margin:[0,5,0,5],
									  fontSize: 11,
									   text:[
											  {text:'Please find forwarded to you the confirmation result of the above named candidate.\n' },
											   'The details of ', {text:  $scope.hisHers($scope.resultDetail.Sex), bold:true},' performance at the examination are as follows.'
										]
									},
						
									  {
										
									  columns: [
										  { width: '*', text: '' },
										  {
											  width: 'auto',
											  fontSize:10,
											  bold: true,
												//widths: ['*', '*', '*'],
						
												  table: {
						
						
														  body: [
																   [
																	{text:'', margin:[90,0,60,0], alignment:'left'}, 
																	{text:'', margin:[30,0,60,0], alignment:'left'}, 
																	{text:''}
																  ], 
																  [
																	{text:'SUBJECT', decoration:'underline', alignment:'left'}, 
																	{text:'GRADE', decoration:'underline', alignment:'left'}, 
																	{text:'INTERPRETATION', decoration:'underline'}
																  ],
																  [{text:$scope.resultDetail.Subject1}, {text:$scope.resultDetail.Grade1}, {text: $scope.gradeIntepretation( $scope.resultDetail.Grade1)}],
																  [{text:$scope.resultDetail.Subject2}, {text:$scope.resultDetail.Grade2}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade2)}],
																  [{text:$scope.resultDetail.Subject3}, {text:$scope.resultDetail.Grade3}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade3)}],
																  [{text:$scope.resultDetail.Subject4}, {text:$scope.resultDetail.Grade4}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade4)}],
																  [{text:$scope.resultDetail.Subject5}, {text:$scope.resultDetail.Grade5}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade5)}],
																  [{text:$scope.resultDetail.Subject6}, {text:$scope.resultDetail.Grade6}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade6)}],
																  [{text:$scope.resultDetail.Subject7}, {text:$scope.resultDetail.Grade7}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade7)}],
																  [{text:$scope.resultDetail.Subject8}, {text:$scope.resultDetail.Grade8}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade8)}],
																  [{text:$scope.resultDetail.Subject9}, {text:$scope.resultDetail.Grade9}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade9)}],
																  [{text:'NO OF SUBJECTS LISTED:', margin:[0,10,0,0]}, {text: $scope.subjOrdinal($scope.resultDetail.NoOfSubjects)+' (' + $scope.resultDetail.NoOfSubjects+')', margin:[0,10,0,0]}, {text:''}],
														  ]
												  },
												  layout: 'noBorders'
										  },
										  { width: '*', text: '' },
									  ]
								  },
						
								  {
									margin:[0,5,0,10],
									fontSize: 11,
									text: [   
											'You will have to satisfy yourself that ', 
											{text: $scope.heShes($scope.resultDetail.Sex ), bold:true}, ' and ',
											 {text:$scope.resultDetail.CandName.trim(), bold:true}, 
											 ' of our records are one and the same person.'
						
										  ]
								  },
						
								  {
									text: 'Certified by:'
								  },
						
								  {
									margin:[0,2,0,5],
									stack:[
											{
												 fit: [180, 30],

												 image: 'data:image/jpg;base64,'+$scope.signatory[0][1],
												  width: 200
												//image: 'image/waec.jpeg'
											},
										{text: $scope.signatory[0][0][1] + " "+ $scope.signatory[0][0][2]+ " " + "(" + $scope.signatory[0][0][0] +")" , bold:true},
										//{text:'ADEKUNLE R.O. (MRS)', bold:true},
										{text: 'RESULTS OFFICER'},
									]
								  },
						
								  {
									margin:[0,0,0,15],
									stack:[
											{
												 fit: [180, 30],

												 image: 'data:image/jpg;base64,'+$scope.signatory[1][1],
												  width: 200
												//image: 'image/waec.jpeg'
											},
										{text: $scope.signatory[1][0][1] + " "+ $scope.signatory[1][0][2]+ " " + "(" + $scope.signatory[1][0][0] +")" , bold:true},
										//{text:'JOHN-NWAFA H.A. (MRS)', bold:true},
										{text: 'For: HEAD OF NATIONAL OFFICE'},
									]
								  },
						
								  {
									  margin:[0,-8,0,0],
									stack:[
						
									  {
										text: 'NOTE: ANY ALTERATION ON THIS SHEET RENDERS IT INVALID.', 
										bold: true,
										fontSize: 11,
										decoration: 'underline'
									  },
									  
									]
								  }
						
						
								],
						
						
								footer : function(currentPage, pageCount) {
								return {
									margin : [ 20,-8, 20,20],
									fontSize : 10,
						
						
										stack:[
												{
												  canvas: [
						
															  {
																  type: 'line',
																  x1: -10, y1: 8,
																  x2: 570, y2: 8,
																  //lineWidth: 3
															  },
														  ]
											  },
						
											  {
											  columns : [
																			{
																			   alignment : 'left',
																					  bold : true,
																				stack: [
						
																					{
																					  text : 'Patrick E. Areghan, FCGP' ,
																				 
																					},
																					{
																					  text:'Head of National Office'
																					}
						
																				]
																			},
																		   
																			{
																					  alignment : 'right',
																					  bold : true,
						
																				stack:[
						
																					{
																					  text : 'Email: hno@waecnigeria.org',
																					  
																					},
						
																					{
																					  text: 'Websites: waecnigeria.org, www.waecdirect.org, www.waeconline.org.ng'
																					},
																				]
																			} 
						
																		]
											}
										]                            
								};
							},
						
						  //   header: function(currentPage, pageCount, pageSize) {
						  //   // you can apply any logic and return any valid pdfmake element
						
						  //   return [
						  //     { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
						  //     { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
						  //   ]
						  // },
								styles: {
									header: {
										fontSize: 20,
										bold: true,
										alignment: 'center',
										margins: [20,10,20,10],
										width: 'auto'
									}
								}
							};
						
							 //pdfMake.createPdf(docDefinition).open();
							 //pdfMake.createPdf(docDefinition).open(newValue.ref_no+'.pdf');
							 pdfMake.createPdf(docDefinition).download(newValue.WES_Ref+'.pdf');
							  //pdfDocGenerator.download(newValue.WES_Ref+'.pdf');
							  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
								var data;
								//pdfMake.createPdf(docDefinition).getBuffer(function(buffer) {
								pdfDocGenerator.getBlob(function(blob) {
								    // turn buffer into blob
								    //data = buffer;
								    $scope.binaryData = blob;
								    //alert(data);
								   // console.log( $scope.binaryData);
								    	$scope.BlobPdfFile = ({
							                fileName: newValue.WES_Ref+'.pdf',
							                attachment: $scope.binaryData
							            });
//debugger
							            console.log( $scope.BlobPdfFile);
								});

							 pdfDocGenerator.getDataUrl((dataUrl) => {
								const targetElement = document.querySelector('#iframeContainer');
								const iframe = document.createElement('iframe');
								iframe.src = dataUrl;
								iframe.width = "100%";
                                iframe.height = "600px";
								targetElement.appendChild(iframe);

								var x = document.createElement("INPUT");
									  x.setAttribute("type", "file");
									  x.setAttribute("value", newValue.WES_Ref+'.pdf');
									  x.name = input.name;
									  targetElement.appendChild(x);
								var y = document.createElement("INPUT");
									  y.setAttribute("type", "text");
									  y.setAttribute("disabled", "true");
									  y.setAttribute("value", newValue.WES_Ref+'.pdf');
									  targetElement.appendChild(y);

							});

							
							


					}, function() {
						// body...
						alert("Error getting the signatories");
					});

					// $scope.$on('sign', function(event, obj){
					// 	$scope.signatory = obj.retSignatories;
					// };
		
					//console.log(signatory);
		
					//console.log($scope.resultDetail.CentreName);
		

		
			});
		
				});



		};


			// 	$scope.$watch('signatory', function(newValue, oldValue){
			// 	window.sessionStorage.setItem('signatory', newValue);
			// 	//window.localStorage.setItem('currentMData', newValue);
			// });

					
	}, function() {
		// body...
		alert("Error getting the signatories");
	});

	//console.log($scope.signatory.length);

	
	};





$scope.printConfirmation2 = function(selectConfirm){
console.log(selectConfirm);
$scope.selectConfirm = selectConfirm;  
	let base64Pdf;

	$scope.signatory = [];
	$scope.second_signatory = [];
	$http.get("/users/permitted_users").then(function(response){
		// body...
		//debugger
		$scope.signatory  = response.data;
		//console.log($scope.signatory);

		if( userSession.getCookieData() == null) {
		//if( $window.localStorage.getItem('signatory2') == null) {
		//if( ($scope.signatory[0]== null) || ($scope.signatory[1] == null)) {
			if (confirm("Sorry!, You Can Not Print Right Now, You Need A Second Signatory Or An AR To Effect Printing. \n Click OK to continue or CANCEL to abort") == true) {
					$window.open('#/log_in');
				}
			else{
				alert('Operation cancelled');
				//$route.reload(); or 
				window.location.reload();
					$location.path('/confirmations');
			}
		} 
		else {


		                 
				
				$scope.second_signatory = [];

				var encodedString = atob(userSession.getCookieData()); 
		          //console.log( JSON.parse(encodedString));
		         $scope.usrSecond = JSON.parse(encodedString) ;
		          //console.log(vm.usrSecond);

				$scope.second_signatory = JSON.parse($window.localStorage.getItem('signatory2'));
				//console.log($scope.second_signatory);
				
				if ( $scope.signatory[0]== null) {
					    $scope.signatory[0] = $scope.second_signatory[0];
					    //console.log($scope.signatory[0]);
					     
					
				} else {
					$scope.signatory[1] = $scope.second_signatory[1];
					//console.log($scope.signatory[1]);
				}

				console.log($scope.signatory);

			$scope.$watch('selectConfirm', function(newValue, oldValue){
	
				// NOTE THE 'newValue' REPRESENT THE MODEL 'selectConfirm' under watch.
		
		
				//console.log(selectConfirm);
				console.log(newValue);
				  var date = new Date();
				console.log(date.toDateString());
				var nowDate = date.toDateString();
				
		
				 $scope.resultDetail = [];
				 var pdfResult = [];
		
				 var dayday ;
		
			

		
				ResultService.ResultDetailsFromDB(newValue.exam_no, newValue.YearName, newValue.DietName)
						.then(function(response){
								$scope.resultDetail = response.data[0];
								//console.log($scope.resultDetail);
		
						
							$scope.$broadcast('print',{
							retResult: $scope.resultDetail
						});
								
								
							}, function(response){
								alert('There was an error from reading Result for Printing');
							});
		
													  
			$scope.$on('print', function(event, obj) {
		
			// body...
					$scope.resultDetail = obj.retResult;
		
					let signatory = [];
					
					$http.get("/users/permitted_users").then(function(response){
						// body...
						signatory  = response.data;
						console.log(signatory[0]);

							// 					$scope.$watch('signatory', function(newValue, oldValue){
							// 	window.sessionStorage.setItem('yearID', newValue);
							// 	//window.localStorage.setItem('currentMData', newValue);
							// })

							var docDefinition = {
								background: [
										   {
										       image: 'data:image/gif;base64,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wS2LVeiZhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACE4FAEHevFm7ybNQqAKeoS7VC/yrrw0Lu4PQr6dF5kuT0zmvRSsZM2wMCmAtABQAUAFABQAUAFAEcyb4yKAMiMmObHocVjVjeJSNEnKZry7WZaKtlzdOa9akvdM5bmpWggoAKACgAoAKACgBrrvUigDDuIzBORjg0mroZes5t6bSeRXnV6fK7opFmsE2MZJ0yO1XTdpAWEOVBr1jMdQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADXOFqKkuWLY0Q14xoIxwCT2oSvoBj3TmWbAr1aMOVWJkzV06LZED610GZcpDCgAoAKACgAoAKACgBD0oAybxPLnyD1pSV0NE6Put68yUbVDRbDNNGZGJ9a9KGiMnuadUAUAFABQAUAFABQAUAU9Qg8yIsOooAzYJDHID6cVlUgmikaqMHUEV5ck4uxQrDINUtwH25zEPavVg7xTIe5LVCCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAjlPGK58S7U2VHcjryyyveS+XFgdTW1CHNK4GfaRmWbOOM16sVYyZvIoVQBTAdQAUAFABQAUAFABQAUAFAFPUUzFuHagCpBJhGBPb865asfeuWixpg+UmuiOxD3L9UAUAFABQAUAFACd6TvcBaYCEZGKAMW9gMMxYcKetDGieymz8hP0rgxNPS6KRd7VzLcYW5wWX0NelQd4IiW5PWwgoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIpeoFcOLeyLiMrgKMq/l3ybR9K9LDwtEmTLumQbU3kV1kGhQAUAFABQAUAFABQAUAFABQAyZN8ZFAGI2Y2I7DiomrjRo6YP3P1q1sIu0AFABQAUAFABQAUAFABQBXvIBNERjmgDHQmKTHdT+dTON0NGtDIJEBzXmTjyysWOi4mPuK68M9GTIn711Ei0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACZ+bGOPWgBaACgAoAKACgAoAKACgAoAKACgCF/vV5uLd52LjsQ3D+XETWFOPNKxRkxKZp/xr14KyM2zehQRxgCqESUAFABQAUAFABQAUAFABQAUAFAGNqEeyUnHWiwy/p64gH9KBFqgAoAKACgAoAKACgAoAKACgDJ1KDY/mLxTAbZTYbb2PT2rjxFO6uWi/nEqn161GHl71gktCzXcQFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBATlia8itLmmzRbGdqMvRR2row0OrBuw/S4Pm3HtXfYzNWgAoAKACgAoAKACgAoAKACgAoAKAKd/FvUY60wJrVdsIpATUAFABQAUAFABQAUAFABQAUARzxiSMqaAMMgxSlT2PHvSkroZpJJvjVhyQea4YrkqF7ouqcgGu8zFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAQnApPYCtI2xGb0rx7c07GpjuTNcfU16tONlYhs3LSPy4QO/etCSagAoAKACgAoAKACgAoAKACgAoAKAEIz1oAWgAoAKACgAoAKACgAoAKACgAoAKAM7U7fI8xeopgVrSUj5egPT2rnrQ6lI1oG3RA1sndEklMAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBrnC1nVdoNjW5n38uyLb0zXDh4XdzR7FXT4TJKG9DXpLYyZtgYGKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIodCp70AYkyGC4PXk0NXQzUsX3w5zUwVlYTLNUAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBHKcCubFO0LFR3MW9k3zkA/lRQhaKHI0tOhEcQbueldJmXKBhQAUAFABQAUAFABQAhIHU0ALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFLUbfzI9w6imA3SydrKTSAv0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAV7t9kZPtXLX1aiXEx7ZDNcZPrXRFWRL1N5F2qBVCHUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAjDcMUAQwweVIxHQ9qAJ6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAMzVnIAUdDWDV6ha2F0uJSu4jJ6it+hFzSoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9k=',
											   opacity: 0.2,
											   margin: [5, 220] ,
											   alignment: 'center',
										       width: 500
										   },
										   {
									            text: newValue.receipt_no,
									            	   opacity: 0.2,
									            	   alignment: 'center',
									            	   color: 'grey',
									            absolutePosition: {x: -50, y: 290}
										    }
										 ],
								content: [
									{
										text:' THE WEST AFRICAN EXAMINATIONS COUNCIL\n', style: 'header',
									},
									{
										columns: [
											{
												 fit: [80, 70],
												 image: 'data:image/gif;base64,/9j/4AAQSkZJRgABAAEAyADIAAD//gAfTEVBRCBUZWNobm9sb2dpZXMgSW5jLiBWMS4wMQD/2wCEACEWGB0YFCEdGx0lIyEnMVM2MS0tMWVITDxTeGp+fHZqdHKFlb+ihY20j3J0puKotMXL1tjWgKDr++jQ+b/S1s0BIyUlMSsxYTY2Yc2JdInNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/EAaIAAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKCwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+foRAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/AABEIAhUCUwMBEQACEQEDEQH/2gAMAwEAAhEDEQA/AN+gAoAKACgAoAy9Xtsjzl/GgDK/z/n1/wA/igCgCWKXbw3I6UNXRMo31LA5Ge1ZNcrM9hCvPWhSKUkJtJqrlXQuCOeaQBwKBC4oEHWgQd6QxT2oEIBRoGgfjQAduaBjImMclOSujSJqQuQAwyc+tcvNyy0NN0WFbcciuyElJXRDVh9WIKACgAoAKAM68g2PvX7re3SonG+plJWZVx2rMkKAFUlSCDyKLXBOxp204lTn7w61UZ20ZsndE9ajIpetefi371i4jK5EUVLsjG3vnNdtBtxaNabtIqVsdIlAC0AFABQAqruYD1pN2VxN2VzSVQqgDtXnSfM7nG3cUnA5pWAz/PMl8MH5QcCvRhT5ab0Ib1NGvOKCgBrsEUselXCHM7IG7GZLIZXLH8q9KEFCNkc0m27jOlWSFAFm0tjIdz/dH61nUnyouMblm8nEMO1evQVzwXPI32Rjj53z2rttZGMmTAdqDMjkkx8qn8aEikiPHWqLQZ9T9f8APegY+GJpZAgHPf8Az/n/AAAOht4hDCqDHA5oESUDFoAKACgAoAKACgAoAKAEoAWgBKAFoAKACgAoAKACgBGUMpUjg8UAYN9am2k7lD0NAFXtQAdqQD45CnHUelBMopllWDcg5rKUbGbVhenpUiAUAHvTTHdhTuO4cjpT0HoH4UgDPvTBC+9SxMOvtQgTEA9qbY2yObKkEU07jTL1pJmPaa5KsWppo3Rbi+XrRCtySE0T16CICgAoAKACgBroHQqw4NAmrmVNEYnKkcdvespKzMmrEdQtBBTAcpKnKnBH6UAnYv210JPlc4YU4ztpI2TuPJya8+tLmm2aoSsRlS9TO1/TiuzDyWqHHRplXFdB2BwKACgBOKBhQBNAfLUzFGYD+6M1lU973EzGrLSxKuoW5/iYfVay+q1F2ObmRHdXsZhKxNkt7dKulh2pXkDkilanE6kkAZ79q7JL3SDbUhhwc/SvJcJLoaC/XiklrYDPu5/MfaD8q/rXoUafJG/UwnK+hWPWtzMPpQBPa25mYEj5R1NROfKiox5jTACLgcACuKUm2bpGNezGSU12UocqFJkca4rVmLY13OSB+NNIaiMHf9eetMsKADHPH4UAbGl2mxfNcc/w0xGjSGFABQAUAFABQAUAFABQAUAFABQAUAJQAtABQAUAFABQAUAMliWaMo4yDQBhXdo9tJyMoTwaLAVvagA/z/k/5/xQDldkPB+opiauWUcOMj8qylDsZNWHZ7VAg7UgDPNMAGP89qAFoAO1Fx6gDyKYXDikAdKLgNkG5SKaYJhZybXANTVV4m8WaoNeZsaEiN2NduGrW92RDRJXeSFABQAUAFAEVxAJkweCOho0ejJkrmU6lGKsMEcVi1Z2MiSOEyRsynkdqm6vYpRurkffHNMkVAS649al6Ia3NEV5r3OsKQEdwu6I4rWk0pDRm13nYtgoGFABQAAEnAoA0o4wkYXHHevPnLmlc45O7uZ19ZeXmSMfL3HpXbQr83uvciSvqUq6iANAEsEMkr4TOfrUylGKuwsXX3W8QQyMzHtnOKwjapK6WgSfKiv9K3MBMUAS28LTPgdO5qZyUVdjirs1EVY0CqMAVwzne7OhKxXvpQkRHc9aqlHmlcZkfefNd6VkZSYrvxtX8TT9SEiMD/63vTNBaAD6UAaOnWRdhLIPl7UwNcAAYHApALQAUAFABQAUAFABQAUAFABQAUAJQAUAFAC0AFABQAUAFABQAUANkRZEKuAQaAMa909oMumWT+VAFH+dIA7UwFVipyDz/n8qQFmOQOPQ/wCelRKN9UYyjYfjFZiD8KBBQMUHFABQAc0gDP8AkUwD60gD60AQf6uX61pujWLNW3ffGOa8yrHlkbkwrNaCJUbIxXp4erzqz3IaHV0iCgAoAQnAqJy5Y3AAc0QmpICteW+9d6j5h29aqSuiJR6leyl2sy1y1moq5VNElzbhvnTr3HrUxqLZhKHVEFsmZunTrTrO0WTTWpdrzzoK91J5bRf74rtwkObmuKTsidulcm0hozJBtkYe9eitUjsjsNplBQAUAT2ib5ckcCsq0uWOhnUdkXq4DmKWpT7IxGMEt15rrw1PmfMxN2RmbWxnBx616FzOxYsohLKAelZ1ZcsGxpamq7LDESMADoK8+KdSepTdlczHYu5Zupr0YpJWRzNtsbTESRRGVwq0m0tWNK+xqRRrEm1R9T61xVJt6m8VYcTgEmsSjHvpt8hx9BXfRhyoUmVQcDC/nW5la7CmUHX+tABQBpWGnliJJRx6etMRrAADApDFoAKACgAoAKACgAoAKACgAoAKACgAoASgBaACgAoAKACgAoAKACgAoAQgEYNAGXfabjLwDjqV/wAKYGWcg+9IApAKCQcg/wCf8/59WBYjkDgDGG/zzUSjfYylG2qJPxrIkB0oAKQCgUwDikAcUwAGiwBnNKwEU68ZHariykWrCTjFc2Jh1OiLL1cRQoOKqMnFpoRMpyK9alUU43IasLWggoAjlOAK58T/AA2VEarYOa4adVxaZTRKORXqxkpK6Myg8PlXZYAbW5Fc+Jj7txwVmWVNefGVi2gCoGLAfMepraVa6sSo2dxDXMyzM1KTMwUfw17GChaF+5E30L8Db4Eb1WuDEx5arHF3RUu1xL9RW1F3iddJ6EHFamoUAFAGhbJsiGRya4a0ryOWbuyWsjMq/Y1klMkpznoK6vrHLHliDROYkMRj2gKR0rD2j5uZsClYR+XPID1XjNdteXNTVupKVmJdSmV+PujpV0ociMpyuyHoK1Mx8UZkcKOppNpasaV9DUhhWFAF69zXHUqcxvGNh1c71KK95N5cRxwTW1KPNLYDDkYuxweK9FKxmxQMUwF/GgBQCTjHPpQBqafYcCSUfQev1p7C3NMDAwKQxaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAEoAo32nibMkXD+nY0wMZ42jYq4KketIBKADpzQBPFNnCt1qJRuZyj1RMeKy9SAoAM+tIApgL/AJ60gCgABoGIw3DFO4Ijtm2SfSipHmibRZozMVhEqdV5+orjoW9pyy6mu6JIZVmjDr3/AEpV6LpS8iYyuSq2DU0qjhK42iUHIr1oyUldGYtMCKY9K58T8BURgry72LHo2OO1deHq8rs9iWhtyMlTXViPgFHcQdK8ssKQBQBjXbbrlz74r6GguWmkYz3L2mtutyP7prz8fHVMqDC9To2OnFY0HujqpPoVa6TcKALltbgxb379OOlRKpyq5hUnrZFivPZkFIQU9gCkBUu2VGO37zDDV3UItrUicraFPvXWYCqpZgF5JpAaltAIE5+8f0rlqVLs2jGxLXM3csQ8A0AY+pT7nIB9q7qELIUmUkHeukgfigAAyeBQBrafYAASSc/3RT2EafSkMKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBKACgCre2S3C5HEg6Ed6AMSWJonKOMEdv8APWgBlIBO3SmBPDMQdrc+hqZK6IlHqicYPIrJprQzFqQCgAoGOVGc4Xk+lAJdhCMHngijULCUAQSDbIGFWtUXFmhbFZY8EZriq3hK6OhFOGY2lywP3M/MK9VwVelqZP3ZaGspBAIPBrxJwlTlZmidx6Njg1vh63K7N6CaJa9Ighn6iuXFfAXEbXmlAKE7APOCMGu7nUqdmyeoyuEoKAGTNsiY+grWjHmmkBhk5JJ719ClY573LulyESsnZhnpXHjYXp3Ki9S5dLuiNeXRdpnTTdmZ9dx1k1tD5snsOTUzlyozqS5UX5DhMD9K5LttI5UIp+UVlLcY4DJoiruwhz8AAVtUtypISIpX8tC35VnThzysDdkZbsXcs3U16kVyqyOZu+omMnAoA0rS3ES7mHzH9K5qtS+iNYRtqyxXK3c0E6UWdgIbuXy4j6mtaceaQGBI5eSvRSsZscOOhpgKB0wKANXT7D/lpKPoKewjUpDCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoASgCvd2kdyhBADY4agDDmheB9jjmgCKkAUATwy7Ttbp6+lJq6JlG5P9KxatuZC0hhQIFm8mVTx6UpR5lYuOjuX2jjnjBGAfUVjGq17sjVwTKk0TRnDfn61umnsYuLRXmXK1UWCJLGXDYNZV43ibxY3UE2zBh/EK6cFO8LdgqLZi2F15R8t/uHofSrxNBVY36kJ2NQV4jTi7M2JUbsa78PWv7rIaGTfeFPFfCOI2vOKCgAouAhOBmmk27IBsUqzJuQ9DjGa2rUJUt9hJpkN/JstyM4J4rXBQ5ql+wN2Rk17RgS2knl3KMemcVnVjzQaBaO5ssMgivATszpRmbDv2AZOa9C6tc67q1zShiEUYUde9cdSV3c5JS5ncJB8tRHR6oSEjztFKa94bJRxVJcpIjHile4IzrqXzH2jhRXdRp8iMpyvoV8VuZGhZ2vljzHHzdvauerU0sjWEepaJ5rjb13NRkkgjjLscAVVODqNRQEFqTM7Tt0PCj2rpxCVNezj8xLUo6lcbmKg+wq6ELK4SZRQc5rpIHgZIGOT2oA1bDT+RJKPw9aewjTAwMCkMWgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBjyKg+agBnnp1B4/lWMueOsdfIZIHBFEK0ZBYdWwgoASgAoAiuLdLhNrj6EdRQBh3do9tJ8wyvZqAK9AC/wCelICeCX+FvTg0pK5MlcnrB6aGYtAEcy5X3pxY0WLGU42npXPiILc6I7F44YYYAisIVLbjauVZrQ4JjyQeorrjUT3MXC2xRjR1nKgc+lbSty6ji9S1eIXtQ7DDLWGFly1eVbGrV4mbXrmJpWF3vAikPzDof6V5+Lw3N78VqVB20L4ODXlxfKzQc5yK6a9RTjuJaEMx2wsfQVhRV6iRaIbK589NrH51/Wu3F4bl9+JnGXRlmvOLK19N5UGO7cCuzB0ued+wm7K5n2lwYJQf4D94V61WkqkbMxTtqT6nJuMYByMZrmwdNwvcubukUa7jMUcEH0oA3UYMikdxXz9aPLUaZvHYEhVZmk456CtnOPLYpzbikR3dwIE/2j0FPD0XUld7EN2QlkS1qpYkk0sWl7UUXoWUXAJP5VPIlqU2Jmue99gDtQrgZU6FJ2HvXp03eKZhNWZbs7bb+8cc9hWVWppZFQj1ZbNcbaZqISFGScChJtpIDIubhrmUKOFzgCvZpUo0YmcnfYvzMILfaPTFeYr1Jtmi0Rhyv5knXNd8VZEMfGhchVGTVCNiy04RYeTlvSnsBoUgCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAZJGsikEUAZNzDJbsSpyv0osAyG8aI4HA7qawqUlPXqUmaUF0so4JB7j0rn550naQ7XLAauiNZPcmwoI7VspJ7CFpgFADJI0lQq4BBoAxL2xa2JZctH646UAVOaQBQBo28LTRBgQSODWVSUU7MlwvqhrKynBUj6iotYzGkZBFADbY7JcUVVeJtBmqpyAa8x6GooOKak0AySGORg33HH8QrqhXVrMlxEnTfEygAkjoTisISSmmWjEYbWII6GvoYu6uc7VmJnByOCKYjXsrn7QmGP7xRz715OMw/L78djSEujLNeeaEN2cWz/St8Mr1UBjo7RuGU4I5Fe+0mrM5zYtp1uI9w+8PvD0NeJiqHs5XWxtGVyhqMu+bYOi134Onywv3FN9CpXaZBk8ZJNABmgAzQBr6e261X2OK8bHRtUuaw2JZ5lgjLt+FZUKLqyt0KbSMeWVpZC7nk17cIKCsjFu5q2H/HoleTjf4hpDYsZrk5n3KK0t2q3KRLzz83tXdRw16blL5EydtCzXFbXYoY0EbyB2GSO3aumnVUY2JlG5IenFYzk2NCHjkmpSu7DMu+u/MPlofkHX3r1sNh/Zq73IlLog0yPdMZCOFFGMnaHL3FFaialPk7VrmoQsrltkdjYNcNubhf511kG1BbRW4wi496GxEucVDkluMWqAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBO9AC0AFABQAUAFABQA1kDDBFAGTe2JQ7kGQe1AFNHKsOcMO9RKKa1GjRtrwn5ZOvriuGpRcdYF+pdD1Ea1twsPDV1QrE2HA5reM0ybBVgIyhlIYZBoAx9QsPJJkjHyHqPSgChSAt2FwYyV6CsK9PniUjWysqDcMiuONZx0Y3FMglsweYzj2NdCmmZOHYpeSyXSqwxk1o78ugR0eppKCq4PavNlqzchju0aRo5MIwOB711ywt6anAluzsT1xFBQBkX8ey4OBgHkV7mDlzU9SKiK9dZkLG5jcOvUHNJq6swNq3mE8Qcde49DXh4nDulK62NoyuRagcWxHrVYJfvLlPZmTXtnOSQTNBJuX8R2NROCmrMd7DHcu5Y9Sc04x5VZA3d3G1QgoAWgAoAvadMIxIHbAAz1rkxVJ1ErFwepWuZzPKWPA7CtqVJU48qFKVyKtSTX085tVrx8b/ENYbC3tx5EXH3m4FThaDqSu9kNuyMncd24nnOa9m2ljE3UO5Fb1FeDWXLUaNo7Dqx6DCqWoFC/u8AxRnnuwP6V6eFw9vfkiZStojPzx0zXdYyNeyiMdsAeC3JryMTUU6noaxVkUpbNmusBW2+uOK6KUrxuEjWgjEMYXH1qnUS2JsPZwoyTxWMqxSRQl1H96FQZA68U4QlLWQPQvQuZEDGukkf0pOSW4ADmpjLm16ALVgFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAnegBaACgAoAKACgAoAKAGsoYYIzQBmXth1dBz1xj/AD/n9QDPB2HDdu9S1cZetrrb8snT1rirUL6xLTLytkZFceqYxwetY1WtxWJA1dUK/ZktDgRXRGomKwEBgQRkHtWgjF1CxMDb4wTGf0oApRHbKDUtaWGbNq+5K8utG0jQnyRWSbWwASGwCAcVtGu0hcoVg3djMnUF23H1Fe1gnemRU6Elrf7AEmJKjo3U/SniMKquq3IUrGiCGGVIIPQivHnCUHaRsnco6nGDGHHUHBrtwE7ScRT1iZteuYBQBNbTm3lDDp3HtWdSmqkeVhtqi1fyiSFCpyrc1x4ai6c2mauV4lCvQMhKACgAoAXNABmgBKBC0DDNAAOtAGnYyLHZF2PCnmvNxVJ1KqSNIPQz55WmkLnvXfTgoRUURJ3YyrJNmwcvar6jivIxsbTTRrB6FiuIsp6hdGMeWhIc85HavRwtC755EydjL616ZkS2sfm3Cr2ByaxrT5INjSubdeJfqbCgkCmptILBnPek53e4WI5kLxlfUUQdmmBn2tjI0pZx8oP516akkiHuawIRAOgFZSq2BIz7vUADsjOPVvSlGDn8Ww9iWxeSQ5OQB2rosSX6YBQAUAFABQAUAFABQAUAFABQAhIFTKSjuAtUAUAFABQAUAFABQAUAFABQAUAFABQAUAFACEZ60AUbywEnzLwaAMpgYn2sOBxSa7jLNtdGPg8r/nmuWrRUikzRRw65U5FefJNOzKHUgFDEVoqskKw8PXRCuKwrBXUqwBBrqjVXUmxg31qbaXK/d6g1qmnsBcsc7cjpXBibXLjsPvmkjQSRsVI608G05OLW4SV4kUOog8TDB9VH9K6qmBjLWLsQptF1GWRdyEMvtXnVKE6b1RaaZn6op3I/bpXdgJaOIprQoV6ZiT2109uePmU/wAJNZVaUaitIabWxol47q2fYQcDkdxXlOjOhUT6G0ZJmORXspmLQUxBQAuTjFACUAFAgoAKACgYUCCgApgFIA6UAO3sUCZ+UHOKVle47jaYgoA0tKfh0/GvPx0LxUuxpB6k95c/Z1wuN56Z7Vz4bD87u9i27IyCxZiSck166VjF6hTA0tLhwpkPfgV5uNqXagaQXUvV5pYUwFp6gJR0Aduq/aPYVihf3JUFF9Oa2ow5nzMb0KNvE00v413JaGZu28QijCimBLSAKACgAoAKACgAoAKAEzUuSQCFgOvFQ6iQ7FWa+RCVU5b9BUJznsO1iAX2OScse3pWsaaj6ibLtvI0iZYYqxE1ABQAUAFABQAUAFABQAgGKAFoAKACgAoAKACgBKAKt3ZrMpIGG9aAMeSJ7dsMODSYyW3nMZyPu96wqUlJFJmiriaP5WIPqO1ee4unLVFEEl1LbsFmj3DoHB613QpUsRqtGS7x9CWK7hkHEgB9G4rGpgqkX7uoudFgEgcdK5k5QZQ2RI5l2yqGFbQr23Cw2KFIFKoTtzwD2pV6inawJWGXSeZAy/jUUJclRMpGN0r6E52gR2RtyEqfUUNJqzAmnu3njCOq5HcVlCjCEuaI+Z2sV62JCgByO0bZViPoaTSaswEZtzE4Az6UJWVkNu4lMQUALQAUAFACUAGKACgBaAEoEFMAoAKACgAoAKAJrafyJS2M8YxWVSmqkeVjTs7jJJGkcsxyaqMVFWQ27u42qEOQFmCjqTik3ZXA3Ik8qJUHYV4NWbnLmNkrIcSAMkgAetRFOWiGCsrDKnIPcVU4OErME7i1mgAEHpVuLS2AhuZhDGT3NVThzSAx3Jlkx15/OvRirIhs19PtvLTceprQkvUhhQAUAFABQAUXATNQ5pAITUupYdhC1YSrDsV7i6WIEZ5qU5z22HaxmXF7JLwePYV0QpJaiuQxo8pwBnP61skSatpYhBufk09hF4AAYFIYtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBXubVJkPAzQBjT2727nj/AD60WAWCYo25T9RWNSmpKzKTNANHdRbWHX/PFcDUqMrotMzbq3a3fn7p6GvWw+IjVXmZyjbVCRXMsRG1zj0J4radOE/iRCdti5HqQJAkj2+4NcdTAxfwaFqb6ltJopf9XIre2cH8q4Z4SrDoUpJj2HBFc60ZaMKVSsjKeMGvoqclKKaMJqzGVoSFABQAUAFABQAUAFAC0AKqs3Cgn6Coc4x3Y7Mmjsp3/g2/73Fc8sZTj1K5GTrpj/xSL+FYSx66IrkJBpiZ5kb9Ky+vT6IfIg/sxMf6xvyo+vz7ByIQ6WvaU/iKazCXVByIjfTXH3XDfhitY4+PUTgQSWk8Yy0Zx6jmumGJpy2ZLgyEj/8AVW6knsQ0JTAKACmIKAFoAKQwoAuabD5kxc9ErkxdTlhZdSoq7L093FACCdzj+EVw0cLKdnsjRuxmz3Uk55OAf4RXqU6UaasjNyuasWIrdNxAAXvXk1FKdV8potEVJb15ZBFb5BzjdXXTw8aUeeoS5dEW1VYIcen6muCcnUmy0ZN1OZX+vSu6nDlRLZZ0613kMRxWxBrgAdKBi0AFACUm0gDNQ5jsIWqJVbBYaWrnlW00HYTNQ5tjsITjrUt6jKV1ebcqnbqa1p0rq7E9DNkkZz/nn/P+fftUbEtkkFq8rcDj3q7CNm2tVhHqfWgCxSAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBKAAfSgCOaFZUw1AGNd2rQPkDigCOKUq2VOD6VlOCkikzQjlS5jKP1+n61wyhKlLmiWmULm1eA5wSnY16eHxMait1IlDqiCuszAEgggkGgRYjvp4yPnLD0bmsZ0Kc90VdoinlEspcLtz2zVU6apx5UEpcxHWhIUAFMQUgAUDCgAoAsQWUspGRsX1auSri4Q82WoMvRafEnLjefeuCpjJy20LUUiyqKgwqhR7CuRylLdlAzqn3mUfU1pGhUlshXRE95bp1kz/u81vHBVHvoJyRH/aNvn+P8q0WXy7i50H9o2/8A00/75qv7PfcXtBwv7c/xMP8AgNQ8BPox86HpdQP0lXPoeKh4Kqh86JhyMjpXM6co7juRyQRyffQN74qo1ZRfusZUl0wHmJsexrsp42S0kiXBMoywSRHDqR716EK0J7MzcGiOtSBaYCUAFIBaAJo7looiiADPU96ylSjKV5FJ22Iic8nk+9aCBThgeuDQ1dWAnuLp5+PuqOig8VlToxp7FOTZa023wplYYPRc1x4yr9hFRXUTULj+AHjvWNGn1ZTKltCZpBn15rsSsQzegj8tAO9MB+aTkkAZrN1LDsNLe9ZSqruFhC1YOtpoVYbmocmwDp1pJNvQYdRSa6ANeRYxljiqSbdkBnXV4W4BwtdNOjbcTZSyXI4+grqSsS2XbOxL4ZgcHpVEmtHEsagKKBj6QBQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADJY1kXDCgDHvLIwksvSgCsjlW9GFRKNx3NCCYTr5ci5rgqU3TfNFlplO7tGgO4coe/pXoYbFKpo9yZR6orV2mQUAFAgoATFMAxSAWgAoAlgt5JzhF47nsKwq140lqWotmnb2UcPJ+ZvUivJq4qdTyRqopE7OqDLsFHqaxhTlUdojehUl1FFJEa7/fOBXfTwHWbIc+xUkvZ3437R6Cu6FCnDZEOTZXOScnPPrWiaexL8yaC1knQspUAHHJrGrXVNpMqMbjns2jKhpI/mOODnFEazlfQbiktw+wyb3UkAJ1Pao+sqy01Y+TUjigeaQpHzjvW1SqqcbyISu7DXRo3KN1HFVCanHmQSVnYUNJEeGZT9cUKUZbCaaLMOoyx8OBIPc4NZVMNTnqNSaLcN9DKACdjejf41w1MFJax1LU+5YZVdcMAwPY1x6wlpoyyjc6cD80PH+ya7aOMa0mJxTM91ZGKsCCOxFenGakroyaaG1RIUwFpAFABQAUDJbaAzzBOg6msa1RU4NjSuzbUALgDgcV4jfM22bbFOexeefjCr/e9a7KM1y6ikWra1S3HXJ9a0lVsibE+6sXWV9x2G7qxdV2HYTNQ22AjMFUs3AHWqjTlLZAVpNQgTIBLH2FdMcHN76C5kVn1KVztjQDJ47k10rC04ayJ5mWLe3kOHuJGY/3M8fjXNVxC+GmtCku5LPcJCuO/YVzRg5vQoy57lpG5P4eldsKajsS2RJG0jcVtYk07OwAG6QfhT2A0QAowKQC0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACUroBHAYYNJzQGbNpm98owFS6iGSwWpgHzEMfUVx4maasiokrKGXDDINcibTuizLvLQwtuQfJ/KvXw2KU1yy3M5QvqipXeZBQIKAEoAWmAYpDLdnZGX55MhB0964cTilD3Y7lxh3NREVAFVQB6CvIblN6mpWub5IflQbm+vSu+hgnL3pkykkZss8kxy7E+3avTjBRVkZN3HSW0kcYdlwDWca8ZTcEPk0uWYLWKa0DdHz1z3rmr1pU6qtsVBJrUL6M+SjMAHHBx3ow1ROo0thyXuiafzFKu3eP7vrTxa1ixU9wlt2kVRHbeVz1zRCrGDu5XG02ixIBJA0KNl0Xn3rFKSn7Z7MpWXujLZFtoAWkCO/qKuo3XnaKukRG0VqJNCGvovRhnPrSp1HCjJPoOWtmTTQedMjMB5Yrnp1HTi0t2W1crTWySXBWMBFUfMQM4NddOrKFJN6tkNJuxVaF1TfjKZwG9a61VTlyvchx7ElveywkfMWX+6TRUpRqKzEnY04LmOdcqcN3UnmvKrYWVPbVGkZphcW6Trhhz2PpWdKrKm9C99zJuLd4Gww4PQ+tevRrxqIxlGxFW5AUwCkAUAAGTxyaGM2bG38iHnG5uTXjYmrzy02RrFWLPeucoKS06gFVuBHJPHEMu6j2zzWsaFSTukK6KsmpxgERqxPqeldUME7e8yeZFaTUJ3yAwUH0FdUcPTj0J5mVmdnOWYsfc5rZJLRCYsUbzOEjGTUVKkYK7Glc1rW0S3G44L45Y9vpXlVa8qj8jRKwy5vAnyp+J9KmnRb1Y7mbJKznqf8K7YwSIbH29s8zdD7/wCf8/4WI17a0WIZPJpiLVIYUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBDLMIj83A9cVjUdVaxVxqwLcI/Rwfoaw9vJfErDsLvFQ8Qh2Df7Vm8R5BYTeah1pDsJuPrUupJ9QshKi9xiUAIwDAgjIPamm1qhmbeWRjO+IEp3HpXq4bF392ZnKF9UUq9ExCgBKACgC/Y2e/Eko+XsvrXnYrFcvuwNYx6s0SQq5JwBXmRjKcrLc0M27vjJlIuE7nHJr2MPhVTV5bmcpdEV7eAzuRnao5JrWtV9nG5MVdjriOBFHlSsxzyCKVKVT7ew2l0NLzEWJTKwCFcYI6153s3Oq1DctOyTKytDAJAsw8txlcdQa6uSrOya1Qrxvcha8aSDynXeezE81s6MIz59iVJ7DYUuk5hWRc+gxTnWpfaYlFk4iv26yMPq2KweJox2RXI+4gsroPvDDce+eaPrtPawcnmMmtrtuXBfHvmrjiqXQHB9w+0XETAuvQY+Zau1KaFaSJo79TtVgVUDnjNZSwqd2nuNTHJ89uVQgvK2fwqJJxndrSI7pr1JJYlkg8mMcKQDWEZShP2kupVtGijdhPPCRKBgY4716FC8YXmZz3sRFZIXGQyMORWkZxmtCXFo0rS9EuEkwr9j61xYjCfagVGXcsyxrKhRhwa8+M3Td0amNc27W74bkdj617VGsqiMpwtqiKtzMKACgZd02DfJ5hAKr/OuLF1VGPL1ZUVqamK8tRb2RqRSXcERw8gz6AZrphhqktbWE2kVJNTxxGg+prqp4KK+J3Ic+xVe8nf70h59OK6o0oR2RPMyDNaCCgAoAntbZrhuOE7tXPWrxprzKSuasccdtHgYAHU968uc5VJamqRSurwtkKcLW1Oilq9xNlIlnbv8ASupKxNy3Z2RkIZulUSa8USxKABQMkpAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAgGBgcUADZxxQBkXonQnOSv6UrDKayEHOdp9c1LimO5et7wg7ZOfeuKrh+sSky6pB5H51xu+wxaAEbO07cFu2acbX12Azn1GZGIKIMH0NexDCUZK6M5SadiM6jOf7g+grVYSiuhPMxjX1wf+WhX6VpGjTjshNsY1zM2cyuc+9XyR7BdkVUIKACgRasbXzm3uPkH61xYrEezXKtzSMTVJVFySAB615EYynKy3NTKvLoztheEH617eHw6pLzMpSvoiOO2lKCXyyUB596csRT5uS4KDtoXFEcLean+okGDx0rmkpP93LfdFp/aQ0QxWxZ2dWVh8o6mm3VqpRtYXup3IC8t0FjRMhfT+tbv2dH3mTrLQsQ6aMAyuc/3RXHVx19IIpQ7lyOGOP7kar7gVxSqVJ7suyQ5pET77qv1NONGpLZCbSIzdQDrKv4GtVg6z6C5kJ9st/8AnqKr6lUDnQ9LiFvuyp+JxUSwlVdA5kSD5hxgj25rJ05x3Q7ogls4ZeSuCe4rSniKkOoOz3KclhLE26FifocGu6njIy0mS4dhlvdGFWjYfeP3vSt6lGFW0uxKbi9Szb/Z1O2F1aX+8w61y1YVWuae3YpNbEdyElvhG7MF6cc81ph040eZbhJ6pFee3e3fnOOzDvW9Guqi8yZQsXLG83/upW+b+Fj3rDFYbmXNHcIytoy1PCsyFW79D6V59ObpyujUxZojFIVPbofWvapVFUjdGMo8rGVqSFAi0l88UYSJFUD15rneHhJ3lqXzPoQyTSSH52JraMIx2Qm2yPiqEFAgpgFIYUAXbSwaTDy/Knp3NcNfFKOkS1EvSSx2yYwBjoBXAoyqNmhm3Fy0jc8+1dlOmo7EtkCI0jADmtkiTUtNPAAZx9BTA0FUKMCkA6gAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAGSIrqQwBpN2VwM2407exMRFQqsHsx2YyGwnRxvAI+tKUo2GXwNowOgryW03oWLSASgClqFsHTzEHzDr9K7sHX5Zcr2FJXRmV7JgFABQIKBhQIkghaeQIv4n0rKtVVKPMxpXNpEWNAqjAFeBOTnK7OhaGdfXXmHy0Pyjr716+Fw/s480tzOcuhFboIyss0ZMfrWs5c96cXqSk0uYvuyRMZnkJjcYXaMgVwKEnaltY0uviRWMsNujeQ5cP1VhwK6lSnN/vOguZLVDbWxaXDyfKh5GOpqcRi1D3Y7kqN9TSRFjXCqAB6CvLcpVJa6mpBPfRxHC/O3oK7aWClLWehLkkUJb6aQ8MUHopr0KeHp09kZObZAzMxySSfetkhXYlAgoAKAHI7IQVYgj0oavowLcWoyqf3mHX6c1y1MJTmtrFqTL8FxHP/qyc+hFedVws6eqV0WpJiXFqk64YYPqOtRSrTpPQt66Mzmjkspw20EDoT0NepCrGvHlZlKPLqiWOWONWuGIaRui+lROlKTVNfChqX2mESy3CM07lYuuT/SlUlCDUYLUI3ZTbCudjcA8GuuLutdyGtdDVsbnzo9rEb19+tedi6DT54lQl0FvLYTx5H3x0rDD1nTl5GtrqzMcjBIPavaTTV0YNW0CmSFABQAUAFMApAKoLMAoJJ7DvSk1FXY0jTtLAR4eX5m6geleZXxLk+WOxqo2LF1K0URK9a5YRUnZlGPJMzk88+ua9CMEiWx1vbPMwAHBqyTYtrNIRnvTAsnO07cZ7ZpALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBDcTCFMkUMDON8wclPmU+vb2rmqUIyd1oUmWobkTL6H0rjqxnDroUiWsBjWZUGWIUepqoQc3yx3Agkv4E6Et/u12QwE38TsS5ogk1MFcRxn6sa6oYGEdWyecz2O4k4Az6V3JWVjNu4lMAoAKACgDWsIPKh3H7z814uMrc8+VbI1guot9ceTFtU/Of0owdDnlzPYqTsrmUpUuN+duecV7DTtoYGnLGjL5pPmQhflRa8xOUJezejfU3VmtClHdNHG0ZAKHop7V3ypRnZ9TJPlZNZWe/Esn3ewrkxWK5fchuVGN9zQd1jQsxwBXm06cqkrI0My5vnlyqfKn6mvZo4aNJeZk532KldRmFMQlAxaACgAoAKQC0AAJByOCO9AzRtL/OEm69m/wAa4K+EUvehuXGdty7JGsqFWAINeanKnLsa3MmeA2syll3Jnj3r16NZVY26mUo21RZWRJkaRxiJOAg6H61hKm6doxer6lJ3GoYrxHTyQjgfKRVTi6FpKVwUuZ2KkcjQyhlPKn867GlONn1M3ozaicSRh1wQR2NeJVpunNqxrF3RnalBscSKOG6/Wu/B1brlYpq6uUa7zEKYC0AJQAUgHxRtK4RBkmoqVFCN2Ulc17W0SAAn5n/vY6V5NbEOo/I0UbFiuZsoR41kUq4yDVxk4u6ArnTIS2VJA9M13Rq3IsW4okiXCiq9oKxJmnzoLBmnzoAp3QC0wCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIgdCp70AY15ZNCxZeRQMgidg42nB9KznBNDua8TFkBYYNeTNJOyLFkRZEKsODSjJxd0NGLPE0EpQnp6V9BRqqrC6MZRsyLNbEARjigAoAKACgCezi824UEfKOTXPianJTbKirs2TwpPTFeEk5P1NjEuZTNKWPTtX0FGmqcFFGMndlq2jgktgTHvcH5sHkVyYj2kZ3UrIqFmrD2EVoSY5ip7p1zUQ9pXj7y0KfKmQ2sJuZjI4woOcDvWuIqqjDljuSlzO5pO6xIWOAAK8unCVSVkaGZI019J8inaOnoK9dOnho2Zk7yJ4dNXH75sn0WuSpjm37hSgluU7uAQTFRnb2ruw9X2kLsmcbbEcUZkkVB3NbTlyxbM0aT6dF5Z27twHrXkxxlTns9jo5UZhGDivXTujBq2ho21hGYg0mSx968vEYqSnyx6GsYqxWubbyZQqnIbpXXh8R7SN30JnC2qLkGnxooMo3t79K4K2MnJ2jsWopErwWqAb0jUHpnippuvUfusbsiKXT4nXMR2n65FaRxVSm7TFaLRnTQvC+1x/9evSpVY1FdGcotFuwvNpEUp+Xop9KxxGHVRcy3FGVi/NEssZVh1715MJSpSujczFc2krRSKHjPUH+deuuXEQutzJpwdyymZI9tvEIkPWQjmuaXLTleTuytWVby3S3KqrEsRk5row1WVRNy2FJJIl02fa/lN0bpz0NGKo88brdExdmXp4xNCyGvLpT5GmbGIylWIPUda96L5lcwas7DaZIUAFMApAWYLx4E2oqY9SOaxqUIVHeRSk0TjVH7xL+BxWLwdPux87HjVF7xY/4F/9aoeBjbRj52SLqUJ6hl/Cs3gpdGPnJo7uGQ4RiT7Kaynh5Q1bQ07k2TXPdlC5NUpyT3FYa0yoPmYD8aqM5vYLEDajEOgJrdKbEM/tIHohz9aahN9Q0JYbh2P7xkUe1aqDW7FctggjIrQQtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABSukAmaXOgDNT7RDsNYK4wRxUuqFiqtlArltv09qylXSQ7EvHavPk7u5YlICte2/nRZGNy8/WurC1vZz8mDV1YyDxXuJ31RzsKYBQAUALQBp6ZHthLd2NeRj53momsELqM2yHaD8zUsDS5pcz6FSdkZqRPIrMoyF616c6sYNJ9TJRch1vM0EoZT7Eeop1IKceVk3sPnxcXWI+d3esoL2NL3uhcnzM1YYxFEqDoBXi1ZupNs0StoZ1/cea+wfdU/rXr4Wh7ON3uyJy6Eun3PAgYfQ1GLoKSc1uKEuhoV45qUNUjyqOB04NengJ2biTNXRDpse643dlFdGMny07dzOC1NQ14uhsY13F5U7D15r3sNPnppmU1qadnIJbdTxkcEelebjKbjO66lQd0NnCm5h3EDmnh1JwlYqWxZrifYZk6hJvnK5yF7V7eEhy00+5nNlvTpC9vtP8BxXLj4WakFPsPvow8DEjleRWOGm41DS11Yx69s5jU0+48yPy3PzL09xXm4yh9uJpCXQdfwebFuUfMK58LV5JamjV1Yr2TNK+JH+SMfdzXdiE1G8FqzOPYdJLEWZYY/Pc9SR0rONNxV6jsi3LsUfmjfkEMDXdFqS0MmmtzbikEsKuO4rxK9Pkm4msXdGZqMey4LYwGr0cHO8Ldiai6lWuwyEoAKYBSCwtABQMmhtJpRlU+X1Nc9TEQhpcpRZeh01FIMjb/boK4p4uUtFoWopFxESNcIoUewrjlJvWTKB22KW9KErsDOmvmJO0hRXXGhFbq4rlRpi3XJ9Sa6FCxNxhZj3P+f8/wCe1JIVySOCRsYH04qrAXYNPfILHHpRZAaUMQiTaO1ICSgAoAKACgAoAKACgAoAKACgAoAKACgBMilzLuAZFT7SIWDNJ1EOwm6s3WsFhC9Q8Qu47CFxWTxC6DsN3+1ZvEeQWAual1pMdhNzHpUqc3sFkJyaXLN9BjWdUHzMAKuOHqS6CuiJru3XrKv4c1qsFVFzIab+3HRyfoprRYCd9WLnRE2pxjpEx/Gtll67i5yhPIskhZU2A9s5rupw5I2uTKV2R1oSFABQAoGSB60mwN1FCIqgcAV87VlzTbOhbGXqEvmT8dFGK9jCU+SmZ1H0JYHhis18zneTux1FRUpTqVb3skEZcqI5ILYoXhn6fwkc1cXWi1GSuHusl0uL70p6dBXPj6migggupYvZvKhOOp4Fc+Epc879EaN2VzIr2znY6F/KmR/Q1M480Wg2N0EEAjoea+dqR5ZNHQndEN4he3YDrWuGny1Ex+RHpqbbfJ/iOa3xs+adjOCsW64SzO1SPlZPwr08BPeJM1dDNMLeeQM7ccit8Zb2epnHcNSb9+oBPAzU4GNqdyqj6Ea3dyw2LIzE8Dua6JU6S96SITZPDp7OQ0zEZ/h71yVMalpAtR6suwwxwgiMY9ea4Ks5zV5l2sFx/wAe7/7pp0Le0QzDr3zmHxSGKVZF6rUyipKzGbiMJEDDGCK8KrB052N07oypoVivQp+6TXq0JupS8yJqzuXgpQylUCYHDAdq4XZ2T11NCjqO0zKRjO3nArvw0ZKLuZT2RZ0uQtG0Z/h5Fc+OhopIIPoO1NN1uCP4TmscJK1Sz6lyV0ZVeuYCUAFMApAWba1ExG6VVB/OsatSUfhVy4pdTSgs4Yh8q7j6nmvNqTrT3NFZE+Mdq52ncYVIC03foAjKHUq3IPBpp2d0BQk0rPMcn4NXbCtdaktEaaa+7DEDH+f8/wCc7KcX1Jsy7Dp8aYJ5IqxFpI0QYVQKQx9ABQAUAFABQAUAFABQAUAFABQAUAFADHkVepxUySe4FOa42k7ZFx2yKxeHpvuVcrNqEik42H3xUfVYdGx3G/2jL/s/lR9WXcLijUJPRDUvDR8wuPGonvH+RrN4Xsx3JFv4z1DCoeGl0C5ItzE3RxWbpTXQdyQOjdGB+hqHFrdARvHKR+7mIPuBW1OrGD1iDVypLb3p/wCWob6HFdsMXRXSxDi+5Vkgnj++rfnmuuGIpz2ZPJJEPetlJMmzQVQgoAKACgAoAKACgCa0TzLhF/Gsa8uWm2NbmyThSa+fWrOgxCPMmx/ebFfRpcsDnk7sutawDIIYLH95vU15qrVNGnqzXlRXuoFj2tGSVcZGa66FWUrxluiJJWujRtE8u2QHrivKxU1Kq2jSKsihqMu+baOi16eDp8lO/cio+hUrsMwoEa+nyeZbAE8rxXj46CU+ZdTWm9LFkjIwa4E7amhHLIlvFuYHA4wOtdFKm607A9EPjcSIHXofWoq03SlysSd0Q3sXmW7DuOa0w0+SpdjtdWGafEI4N/dxn8K3xlTmnyEQRRl3XN0dnJJwK74JUaSv0IlqzStrZLdeAC3dq8mvXlVl5GkY2K13esGMcZwQeSK7sLh0oqUhTlbRD9MYsJCzEnPc1OO2QoFm4/493/3TXHQ/iRNDDNe8cwUAammSboSndea8zHQ2mawfQbqcQKCTuDilgp2k4lSV0U2uZWiEZclf1r0OSCfMZpvZEbIyj5lI/CnGpGTsmLlaLGnSbLkD+9xWWJhzU2EXqac67oHGOqmvIpPlkmbowq985xKYgpAFAC0DFBx3x9KAJoZJ2bbGzk+maxn7NK8ilc0bdLoYMsgAHYDJNedVq0mvdRaT6lquVlENxcCADjJPSrpwc2BSfUJOQCBnpx0rpjh4k3JLa6LuDJNgemK0VGHVCuzTRgygqcitUIdTAKAEoAWgAoAKACgAoAKACgAoAKACgAoArTWiynOSKAKb6WexoAryadIvQZ/wp2Ahe0kQfdosAwxOvY5/WlqA35h3P1oAXeR3/Opsh3F8z2/WlyoLi+Zjnp/n/P8Anoco7j0uGX7rkfjUSpJ7oLkovZh/GDx3xWTw8Ow7ki379wpFQ8NHoO4/7XC4xJED+Gan2M4/DILgILW45QFT7cUOrWpbhoxraWP4ZT+IrWOYS6olwRA9hOp4AYe1dEcbB7hydiB4ZI/voy/UV0wrQn8LM3FoZWogoAKALemrm5J9BXHjZWpWKgtTQuW2wMfavKoRvURujHiQyzKi8EnrXu1J8kHI51qy20k/yNIqugO0f7VcsVTd1FWbVy3dDJi73qI6hcEcLyBV0uWNFyQp3vY1TwK8W3NKxqYUzbpWJ7mvoqatFIwm7sZWhIcdqQF7TJCsrIejD9a5MZBSpX7FwdmadeGbGfqcn3U/GvUwENHImbsh2lyZRo8D5eRTx9NWUyIPWxdIBGCODXlp2d0akN3KIbc44yMCunDU3UqK4norlfS4htaQ9egrrx03pEiC6l2UlYyRyQK86CTkrmiMNyS5JPNfQxVkkYS3NHSh+6fjvXnY/dFwLNzxbufQVyYfWaNDDNe8cwUDLemttucH+IYrmxUeakyo7mhdpvt3H415dCfLURsUbJSsLyRoGkHYivQxOslzbGcCWGWW5jlEwXaB6dKirCELcm44t3sylbHbcIR/ertmrxZl1NsjIxXgLQ6DCnXbM6jsTXvUneCZjP4hhBFaE2EpiCkA+NDI4UEA/wC0cClJ2QzSh01VAMpLH26V51XE1L2SsaKKLiIqKFQAD2rilKUndljqh6IAovqBXubUXCjDFSO+K2oz5RMoNpk6n7oYexrvUkyLE8GmtkFz/wDXqk0I044/LQLnOKBj6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBCAeooAY0KMMFQfwp3Ajazib+Gi4ELaZGTxRcCB9K/umjQCGTTZF+7zRYCBrKZR0NKwEZhkGcqf8A6/8An/PqWAQh19aAHRrI5woz+FS0h3Zp2ls8XL4z7Vw4icXoikWa4yhsjrGhZjgCtKdOVSSigMq7u2nO1eEHb1r26GHjSXmZSlfYrV0EBQAUAXtKH7xz7VwY9+4i4blnUDi3riwa/eGr2Zn2jpHOGkYgY6gV6uIi5QaRhHcugQSqgWbhW3c1wKNaLbUd1Y1cotO5CCH1QEHvXTyuGGs+xMmnJF64O2FyPSvMoq9RGphnk19AjmYUxBSAfE5jkVh2NKSTVgN0EEZ7V87ONpNHSjIv3D3Jx0HFe1hI8tJJmU3qJZSmK5XB4Y4NaVoc8GiU7M2TXzzVnY3MzU5cyCMfw9a9fA0uWHN3M5voTaU4MbJxkHNTjqd7SFB9C72ryzUoSabukJWQAE9MdK9CGNtG1iXFN3LdtbrbphcnPU1z1akqru1oCSWw6WMSRlD0NZ05cjuijHuLZ4D85Bz6V7VGuquxjKFtSGtyCW1OLhD71FRXg0NOxsyDKMB6V4MfjR0IybRJGlPlttH8RPpXs1pxjD3lcxSfNoT/AGZSHWG53MRyoPWsfa1I6yjoXZNlJcpIM8EGuy6lG6MmmnY3lPyA+1eBJWbRujEuuLl/rXt0P4aM6mkiInIrYhu4UCCgYUASxTyQnKMRUyipboFoW4tTbIEqAj1XrXLPBwa00LUmW0vIJDgSAH0PFck8JOOxSkieuVqzKCk3ZbgIZAnVgPrWsZu+morDPtkI/jFap1P5RALyNm2r82fatIyrdEFkWVOVB6V0K9tSRaYBQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACEA9qAGmND1UUN2Aia3hP8ArGVVLYdhQFT7oArkqV7lWEJJrmlJy3KsMllSFC7nAFaUaMqsrIG7GRc3LTtk8KOgFe3RoxpRtExlK5BWxIUCCgYUAX9K++/0rz8w+BFw3J9R/1H41yYP+IavZlGyMgn/dKrEjkNXqYhR5Pf2MI3voXZI7fbm5WNG/2a82DnJ/unp5m/TUq2uz7evl5K84rvrXVBqRlpzaGhdf8e7/AErycN/FRqYhr6A5gpgFABSAsR3dyAFR2PoAM1jOFLeSRSv0HLY3EnzEAZ67jisXi6cdEVyN7jJLWaHBZePUc1pDEQnoDg+hINRnAA+Q/wDAaPq1J62J5mis7l3LN1NbxioqyE3cdDK0MgdDgilKKkrMRow3dxMuVt1PvnArzqtLDwdmapyYspvSvyqi/wC6eaiEqEZalWfcoiaeGbLO24dQx616K5KkdNjJpp6lwamm35ozn2NccsDd6PQpT7lS7uvtJGE2ge+a6qNCNLYUpXVivW5BJB/r0+oqZfCxm2/3D9K8CN+ZHQtzKspUR3VyQHGMjtXsV6blFNboyTtK5NFbR2zec8wYL2FYyqVKq5Etx2W5SkcPMzAdTmuyMeWCRDd3c3E/1a/QV4c/jZstjFu/+PqT617OH/hIyqfERVsQFAwoABycDmk5Jbjs2TxWc0vRCP8Ae4rnniYRKUGWotMOf3r/AILXNPG6e6UolqO0gj6Rg+55rklWnJ6srYm6DjistWrgUbm9YEqnA6ZrqhR6sTdilJOWPJJzXTGCWxNyMsSeuPpVpILksDTg/IT1p2EbNoZDH+8zn3osBYoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAaXHrWEq8Fsx2GF65Z113KSGk5rnlNyKsJUAIc4460IDNube6mfcyA46AGvXo4ijBcq0JlFsqvDKgy0bAe4rqjXpy2ZDgyOtbpkWCmDCgAoAvaWcSuPUVw49fu7lw3Ld6M2z+1efhXaqjXoZtpvNwoiYK3qa9mq0oO6uYLcvvcwoNsziQ+y15yw1STvFcqNeZIpwOragrRjapbgV2yg1RcW+hDd5XRqSLujYeorxKbtJM2RhNwT9a+jjscz3EqhBSAdGhdwqjJJqZyUVdjSNm3tkt0GMFsctXh1q8qsvI2UbFa41DY5WIA4PJPSu2hg48t5kylbYntLj7TGSVwRwfSufFUFSalEcJXKmoWwjPmIOD1HpXThK7a5ZBON1cpV6BkaFnYjAkl/Ba8zE4r7MTSMeo7ULgxYiTg9yOMUYOipe/IcnZaFizkMturNyehNc+Kgo1HYIO6GXtuJYiwHzDoaeGqyhKz2La5lZmRXtHOFAgoGTWi7rqMe9Z1ZcsGwSNiY7YmPtXh01eSOhGbZImySVk3lOgr1MS3eMb7mcNWO+125xvtgPTAFL2P8ALIfM+qKgAaUbRgFuBXU9Iamb3N0cIOO1eE9ZM2RiXRzcyf71e3QVqaMp/ERVqQFAwoAv2t9FGuGh2n+8tclXDc+qZalY0IpY5RmNw1efUw84dC1JMfWOowo6gJ2pAVLjTVmZnRiGPY9K7KVRrRktFUabNuwV/wAK6VJMmxbh0wLy3P8AWrAuRwJGBgD60XESAY6Uhi0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBWu5lVOJAp/OonCM1aQ1oZT3cnTzSfpxWfsKfRDuC3cg6SZ+tS6EX0Hcsw3rMQrAfWueph0ldDTLg5FcgxaAEoAZNKkS7pDgZ/Gt6NGdR+6DdjLurkTHCoFX1xzXr0aCp6t3ZlKV9CtXSQFABQBa059tyB/eGK5sXHmpMqOjRpzjdC49q8ai7VEzdGFjnFfQ30uc1iT7PJtY7cbeuay9tG6XcrkZJJF9mMUitnIzmlTn7Ryiwa91NGuDlR7ivDnHlm0bLYxLhCk7A+ua96jNSgmYzWpHWpAUAjQ0qP78hHsK83HVLJRNILqXpziByOwrgo6zSNTCNfQnOaGlf8tOPTmvOzB+6kXDcuTpvhdfUV51GXLNM1M2yg33PI4TrXsYiry07rqZJamseBXi7s1MOc7p3JPevoaatBGE/iZd064jVPKdgpzxnvXHi6Dn7yHCVtGW55EjjYsQOOnrXDSozcrJGqaMM9a90wYlAhaALmmR7pi390Vx4yfLC3c0gtS9euEtX9xiuDCx5qi8jQpWaTBC8MiAnqrV6NeSWko3RnG3clklu0RjJEjLjrXPBUJNJF+8ipar5l0gPc812VXy02ZrVm0cY9q8RO7NTAlOZWPqTXvwVopGUt2NqiQoAKACgBQSDkcGkMtxajMmA+1175HNYTw9OfQabRdivoZSBkq3oa4qmDnHWOpSkizXJKLW5QUJ6jFBq1NpCsODVvCrroKw4Gt41E9xWFrQQUAJQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFO6sRMchiDQBRl0yRfu5IosgIDZzBvuH/wCtRYC5aWRQb5Dz6VyYirZWRaRc6V5xQE4FNJt2QFK41BV4h+Y+pHFelRwS3qfcS5Gc7tIxZySfevSilFWRk22NqhCUAFAC0ASWzbLiNj0DVFRXi0BtkBh6g187rCXodBiTp5c7AdjxXv0Zc9NMymrSNIhCPMeRQjrggtXA4VFeKj10LUlZMrXTQvAqxFm2cZx0FdFGMozvN7idrWsXLGTzLVemV4NcWNp8s79wg9LFTU4jvEnY8V0YCppyDqLS5RNekYBQM19OA+yqe+TXjY+/tDWGxPKm+Nl9RXJTlyyTNEUI9Ncn53AHtXpyxy+yjPkLiCG2TAZVHuetcjjWru9h6Ihk1GJchAzH16CuingHvJic0JpvzLK/ctRjdFGKCOrbLp6GvOjoyzCm/wBa/wBa+ip/CjCfxMZ39KskUknqSfrQAlMBKAFpDRradEY4Nx6vzXkYyopSsuhrFEOqyD5UH1NbYGD1kwnoh1otqFDKyGQf3z3orqq5eQotW1G3z3AQh/L2H+7V4eNO+kbMbvbQj0xCbnd6CrxcrU7ER3NC6fy7d2744rzaEeaaTNkYfWvdOcKACgAoAKACgAoGFAE0NzLCcoxx6E8flUTpxmrSQXsXodTVuJV2+45FcdTBp6wKUu5cR1kXKMGHtXDUpTp7lppjqz6jFBxVRk0hDg1bxq6isKGrdVO4rC1qmnsIWmAUAFABQAlABQAtABQAUAFABQAUAFABQAUAFABQAUAFABQAh6Um1FXYDGYVxVcQnoikiMnNccpORdgqQGuiuNrqCPQ04ycXdDImtIG/5Zj8K1VeouoihfRwwkJGpDdTzXp4RzmueWxE7JFSu4yCgAoAKAAUgNu1fzLdG9sGvCxcOWqzaDuijqUW2UOB96u7A1Lx5WFRaXIrdrZFLTKzMDwB0rorQqS+F2RnFpbly48+UBIAPLYZripOnTbc9WmabpNEFjKbe4MTnAY4/GuqvTVandbkL3WX7iITRFD+FeRSm6U7mpiOpRipGCK+ghJSV0YSVnYSqJNTTH3QFM/dNeVj4aqRrB9C42QpwMntXnRtfU0Mqa9nLFd2wdMAV7tGhTjFNIyk3cqkknJOT710kB2oA09KP7lx33V5mPWzNIF2vN0NDHv02XB9DzXuYSXNTRlUWtyvXSZhQMKBBQBLbQmaULjjuayrVFTjcqKuza4jj7AKK8Nc05epskZcQF1fHdyvJx6168k6VH3dzNu8iYTQTSeQ8JHOFI7Vj7JxhzqWpTlZ2sUZl8uUpk4B4FdlKXNBMiaszS0xNtvux94152NneaiVBCapJiIJ/ePSngoe9zdipaIy69QxEoAUDnFAFgWM5HEf6iuZ4qCdmXyDxp0x/uis3jIIfIO/syX++n5ml9dj2DkD+zJP76D86X16PYfIL/Zcn/PRfypfXV2DkQ9dLOfmk/KpeN7IOVDhpiY5kb8qh4yfYOVD005EOVlkB9QcUnjJsOVFpFKqAWLe561yylzO5Q6pYBVdRCg4oi2loAoat41ddRWHBq3jVFYXNaqaYhaoAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAM68u5UyAoX3zmuedJzd5P5FJpFBruRjzIaFQiug7joZ5C/ysT6ilKlG2qC5qLnaM15r3KHUgI5mZIyUUs3YVdNRcveegzMNncyEsy8n1avX+uUY6IzcGyOa1kgXdJgZOBg1rSxEartElwsrkNdBAUAFAgFAzQ0yUfNEep5FefjqbcVJdC4PWxau4jLbso69RXBhqnJUTNbX0MmBxFMCy7u2DXtzj7SFrmF+VluaS7kk8oALnsv8AjXLT9hTi5Gj5iCeD7OFLSAydcela0qsqjvbQmSSRpWk4nhBz84+8K87F0OSXMloyoSvoVtQtt371Ac9xWuDr29yRUo8yM6vVMC1p8wimw3Afjr0rnxNL2kGhp2Zr14L31NzLv7Yo/mKMqeuB0r1sJiE48rJnG+qKf4V3tpamNi5bWBdQ82VXHTvXDWxVnyw3NIw7i2EgjumjB+VuAavEU3OjruK6UtDT6V42z1NSpf2/mpuQZYV2YWuqcrMTXMrGUeCR3r2FJMwaaJoLWScjauFP8RrGpiIU9OpSi2Mmj8qVkznHetKc+eKkKUbOw1VLEBRknoKptJXYjXsrfyIufvN1rxcTW9pLyNoqxFqNxtXyk6t1rfB0ftyCTsRW8SR7Q5eKbqrEcVvOUpu8XddiUrLUUiSzZ5JIxIW5D56VK5a1obWHa2qKmGnm93PNdjtTj5Izd2zbVQqBR2FeDKXO7my0MjUJRJcHB4XivZw1PkgRN9CtXQZhQAtAF6xvNmIpT8vZj2rlxGHVTVblKVjTryHHlumahR1AjM0Y4Lr+dNQlbRAH2iLP+sX86fJO+wB58X/PRfzo5JdmAvnR/wB9fzpckrbAKZox1YD8afLJvYBv2iL/AJ6L+dHJPsK4vnxc/vF4680uSfYYvnR5++v501GXZgAljPR1/Olyu1rMQvmJ/eH50Wd9gF3r/eH501cBwceorRVGtwsODD1raNZPqKw4Gt1UTFYWrEFABQAUAFABQAUAFABQAUAFABQAUAFABQAyXdsO3rQBlTWc8jknJ/z/AJ/z1LARDT5ien40WAuW1slumWwD7159eq5PliWkSfaIs43jNc/sp9iiQHIyOlZ2sAUDEZgoJJwBVRi5NJAY11OZ5Sc/KPu/SveoUlShbqYyldkNbkCqpY4UZPoKmU1FXY0rj5LeSJcyDZnoCetZwrKo/dHy23I62JJIJTDMrgZx2qZwU4uLBM21IdQQcgivnakHCTizoTvqZN9B5UxIB2nmvYwlb2kLPczmupKl2xsyPMxIvHI6iieHXtVK2govSxRJJOTXZYgltp2t5Ny9D1HqKzqU1UjysNndGyjLLGGXlWFeFVpSpSszeLvqZ15ZmMl0GUP6V6OFxSkuWQpRvqimOOld5iadpfKVCTEKw6NnrXn4jCOT5oFxlbRlzhh2INea4Sg9TVMj8qCE79qIfXpW0XWqaXE7FK9vQ6mOPp3au/DYX2fvS3IlPsUQcHI613GZr2t4kyhXIVx6nrXl4jCSvzQNIy6Ms4OK4XCS6F3EKKTkqD7kVSU9lcdyrd3iRKUj5f8AQV2UMI5WlMmUrGXy7dyTXp6JGOrNOxs/KAkkA3Hp7V5eJxDk+WOxrGNie5nW3jyTyegrHD0XUfkU3bUzIJF89pZjyOR9a9SpTbhywMk9bskS+35S4XdGx/Ks5YWKScNGh87TIrhlU+XFIWj64zWtJStea1FK32S1pcJ5lP0FcmMq/YRUV1LV3L5MBPc8CuTD0nOVi721MQ17hi2FAgoAKACgDQsLwgiKU5B+6T2rjxGH51dblRdjQYblwO9eVs9TVGLcLJDKQ469D616NNxktCWR+afTH49KvlFcPM9v1o5QuL5vt+tHKFw8z2+v+e1HKFxPMPcD/P8An/Pc5QuL5n+z0o5QuHm9OB/jRyhcPN9jRyhcPM9sf0o5QuL5nHTHtRyhcPN9j+dHKFxVuCp4LD6GlyXC6J01CUdX/MVHsIjuXILqVzxsP44oVK20hXLyEkc1pFNbu4h1UAUAFABQAUAFABQAUAFABQAUAFABQAUAJQBWu7hovlVOMfePQVnUjKWmyGrIx5LmRydxJ9u1TGjGOxXMECtNIFA4/wA81UrRV2Tqa8SbECk5NeVUlzSujRD6gChfzFz5MYJPfFenhIRgueRMr7IgTTpmOSAo9zW08bTjoiVAtxadEhBYlz79K45Y2pPRFcqQs88dquFVd/YAVVChOs+ab0G2kZckjSMWY5NetGKirIxbuMqhBQBo6bcf8sWPupJ/SvPxtHmXOty4OzsW7mETxFD16ivPo1XTnc130MV1KMVIIIr3oyUldGDTixtUIKALFpdNbt6oeorGtSjVjZjTaNZHWSMMhyprxKtKVJ2ZspXKl1YbyXi6/wB2uqhjOX3ZBKKkZ7oyNhlKn0NepCcZq6MnFrcFldBhXYD0BqrEiMzMfnYn60egCHrTAO1AgoGPWR1+6xH40rJ7gI0jsMM7H8aLJALFC8zbUGTWdSrGmrsajc1LWzSAbm+Z/X0+leXWxLqPTY1UbElxcJbplup6D1qKGHlVfkNuxkTTNNIWY/QelezCCgrIxk7kVWIWgCW2hM8oUdO5rKtUVON2NK5tKoRAo4AHFeHJubuzZK2hlX8/my7VPyLXr4aj7ON3uyJvoVa6jMKAEoAWgAoAKANOxvd2IpTz0DVw4nD83vR3LjK2jLc8CTptcfQ+lcMJuLLKX9lnPDZrup1IzRLQn9lMBwRWgg/sp/UUaAH9lP6igB39lHHB+lACHSm7H6UAH9lt/ntQAn9lv3/GgBP7Lk9eaAE/syQHjp9P8/5/UAP7MkxxQAn9my0WAF02U0AOXT5l6H/P+f8APoWAvWqSocP0pWAt0AFABQAUAFABQAUAFABQAUAFABQAUAFACUAZl7HNNJgA4HvRYCJNMdup/SiwF2C3SBcKOfWvOxFXm0WxaRJXIUFACAAdBim23uAtICpd3ghyqYL/AMq9HDYTmXNPYlySMtmLEljknua9VK2iMm7jaYhaAEoAcjFWDKcEc0NXA2bacXEW7gN3FeJiaHs5XWxtGVyC/tRIvmIPmHX6VWFxDg+V7DkuYy69hO5hYKYBQBLBO8DZQ/UHoaidOM1aSBOxp295FMACQj/3TXlVsFKOsdjVT7kskMcgw6KfwrljOVPZllOXTAcmN/wIrtp45/aRLgmVns50P+rJ9xzXXDFU5dSOR9CIxuOqMPwNbKpB7MnlYm09MH8qrnj3DlYojdjgIxPsKl1YLqHKyeOwnfkqFH+0awnjKcSuRluLTo1wZCWPoOlcc8ZOXwopQSLYUIvACgVy+9NlFS6v1j+WLDN69hXdRwbdnMlysZskjSNuckk+pr0oxUVZGTd9RlMAoAciNIwVRkn0qZSUVdgtTZtbcW8eONx6mvGr1nUn5GyViK/uPKj2KRvb9K1wlByfNLYJOyMqvWMRKAFoAKACgCxa26XBIMoRvTHWsK05QV0rlRs3Zk50tscSj/vmuVY7yL5EIdMlHR1NV9dXVByF62EqptmIJHRh3rkrShKV4jSsTA4rOMmtbgSA5rvhUUyWha0EFAC0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACYHpQBWurtYeACTWNVTkuWJSsUH1ByflAFYLDLqVcdBeO7hWwameHSjdBcvjkVxDE+lAFO8vRHlIjlu59K9LC4T7cyZStoZhOTk9a9VGTEoEFABQAUCCgCa2na3lDDofvD1rKpSjUjyspNrU2I3WRA6nKmvDq0pUpWZsndFG9sySZY/xFduFxVvckKUeYzzweleomnsYsKBBmgY4OQhUAcnOe9K2twJ4b6aLgtvX0b/GsqlCFTdDUmi9FqED/AHmKH0IrgngZp3iy1NE6SxyfccN9DXNOhUhui1JMfg1lyyT2GGPahXAM9simot6CGNNGgy0ij8a2jh6reiFdFWXUkUYjUsfU9K6qeBf22JzRSnupZj8zYHoOK7adGFP4UZuTZDWohKYgpAOVSzBQMk0pSUVdjsa1naC3XLcue/pXj4jEOo7LY2jFIfc3KQJkjLdhU0KLqy8ht2V2Yzu0jFmOSa9qMVFWRi3djaYgoAWgBKAFoAVWZGDKSCO4NIDYtLlbiPsHHUV5WJoODutjWMr7liuMoZLKIl3NTjFydkBAL+PuGH4Vr7CfSwFiKdJOVbn0o9+DuxE6tmuynVU0S1YdWogoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAEPAoAyL7zZHxt4H+f8/5wAVY7WV2wEPuaT0V2BpW9kkC5OC3rXBXqtqyZaRP0rkjFydkUZ95fbiY4TwOrev0r18NhFBc0tzOUuiKGa7zMSgAoAKACgQUAFAwoAntbprdvVD1Wsa1GNWNmNOz0NeORZUDIcg14lWjKk7NGyaZVurESZePhu49a6MPi3DSWwSipGY6FGKsMEV68ZqSujBxaYlUIKYBSAO9AxQSOhoEOE0g6SMPxpOKe6Ad9om/56v8AnS5I9h3GtK7fedm+pzVWQrjaAEoAKACmAUgJIYXmbagz/Ss6lWNNXZSVzWtrRLcZ6t6kV5FbESqehqkkOuLhLdMnk9h60UaMqj02G3bcx5pWmfc5/wDrV7EIKC5YmLdyOrJCgYUCCgYUALQBLDbSTqTGAcds1lUqqnuNK5LFBdQSB1jPHpWMsRRmnFsrkaNWNt6AkFT3B7V5dRKMmk9DQZcQLPHtJIPqKVOfI7oDImSSCQo45H616UWpK5LuhokIwcdKrlQrl6zu5DgZDex61k6K3i7MLmsp3KD0zWy8xC0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQA1lXuoqZTUUAwkDsK4atZvctIjdwoLMQAO5rmjGVSVkVsZd5emU7I8hO/vXs4fDRpK73M5SvoinXWZhQAUAFABQAUABoEFAwpiCkMlgne3bKHr1HrWc6cai5ZDTsa1vcx3C/Lww6qeteRXwsqbutUaRncWe3SdcOOexFY0606T0L33M2exkiyV+ZfavUpYyM9HuZun2KuK7U09jNoKBBigApgFABQAUAFABQAUAKqljgDJqXJR3Ha5et9OZuZjtHoOtcNXGJaQNFDuaCRrGgVAABXnSk5u71NFoQXd4kAKrgv6eldVHCueslZEuVjKkkaVizkk16kYqKsjJu408dwaoQlMQUhhQBMttI0QkAyp9OSPwrGVaMZcrKUbrQiIwcVqmnsK1gpiHwytDIHQ4P86mUVJWYG1BMs8e5fxHpXjV6LpOy2NYu5JWBQUr6bgMmgjnGHGT2Pet6dRxd0JoqtpYP3W/Su+E1NXRDGf2dJGwZTyP0qwNG2DiPD9aQE1ABQAlAC0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACE4rKdRRGkRs1cFSrdlJEUkixoWc4ArOnTlVlZFbGTdXbTnHRB0Ar2qGHjSWm5lKV9CvXSQABPABPtSclHcEiVLSd+kZHuRisJ4mnHqUoMsppjcb5FHsBmuSWYL7KLUCwtjBEMkFiO5NczxVWo7FKKMqRt0hIAGT2r2oR5YpGMndjaokSmAUAFACj1pAFACgkEEdRRYC/b6j/DOCf9oD+dcVbBQnrHRlqbRoKyuuUIYeoNeXUozp/EjVNMjlto5vvrz6jg06dapT2HvuUpdNI/1T59mrtp4/8AnRLgmVpLWaP7yH8Oa7IYmnPZmbptbEJBHWtVKPcTTCquTYKACi4DlRm+6pP0FQ6kVux8rZNHYzyfwbf97isJ4unHqUoPqWodMUf61sn0WuWpjm/gRagi7FCkQxGgUVyTqTm/eK2GzTxwjMjYqqVCpN6IG0jOuL95AVT5V9R1NenSwsYavVmbn2Kma6iLhQAlAgoAKYC0hmnpZzCw9DXm45apmkC1LbxzffQH9K44VZwfumhRm00jmE5Hox5rsp43+dEOC6FOWJ4Th1INdsKsZrRkOLQ+2naCQMvTuKc4RqRsxbao2YpFljDocg14lWk6UuVmqdx1Z/IYMwUZJwBTXNfQBI54yeHU+ozW9OU6erQmrk4IIyK7oyUldEC1QBQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQA1mx0rnqVraIaREWzXnzqX2LsQzzpAmXPPYetVRoyqvTYG7GbJ9ou3yI2x2A4FerGdGgrJkNSkPi02RvvsE/Wsp4+K+EFTLEenxJy5L/XiuaeNnLRaFKKRMBbw9AimsOarPuUKLiNjgNk1LpTSu0F0SVmBW1CTZbkDq3FduChzVL9hN2TMivaMAoEFABTASgQUDFoAKACgB8cjRtuRip9RUuKaswLkOpMOJl3D1Xg1yTwdOXw6FqbRbS8gk6Pj/e4rhq4OpHZXLU0Tjnpz9K53TmuhV0IVB6gH6ipTlHqO4wwRHrGh/4DV+1mvtAJ9mh/55J+VV7ap3YCiCEdIk/Kl7Wb6gPCheFUD6CoblLcALqv3mA+pqoU5y2QrkE19DHwG3n/AGa6oYKcvi0Jc0ipNqMjcRjYPzNdlPCU4b6kObKbMWOWJJ9TXWkloiW7jaYgoAKQC0DDjv070AWJrOSNQyjehGciuaGJi5OMtGXyaXRXrpILulNiZl9RXHjY3p3KjualeR1NQoVhiEBhggEe9NNrYCpNp0bklDsY9u1dVPFTi7MTSZFCs1i5LjdGeuD+tdMqlOvG3Unka1RoKwYBlOQelebKPLKzKGzx+bGVBwe1OElFgZDrJby7ZByOhFejFxkroh6GtYSK0fDk/WrSS2Qi3TAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgApNpasBjNXHVrFJEZOa4pScikJUjGN5anc2M+pqk5PRDIXvIl6HP0rSNCbFdED37fwoAPc1usMurFcrvdux5kP4VvGjFbIm5CZSeev1rRQQXJ7ONpWzUVZKEbgtTWAwMV5TLMvUpMz7R0UV7WChy079zOoynXazMkjhkl+4pwO9YzrRhuUotkZ4OK2WqJYUxCZoAWgApAFMApAFABmgLi5oAVXK/dJH0NFhkqXcyDAc4HY81k6NOW8UPmZKupTjqVP8AwGoeFpdgUmL/AGnN6J+VL6pS7BzsY1/Of4gPpTWFpLoHOxhu526yt+daqlBbIV2RM7N95ifqavYQlABQAUAFABQAUDQUAFAGrpsm+AoeSv8AKvMxkLSUkaQfQW4sI5RlBsb2HBrGliZw31LaT3K1tFJbXa71IB4zXZUqxq0mkRytO5qV5XUso6jI8YGM7e+K6MPGLB7FaO6dD8r59j3rolSjLdEplmO/H/LRfxHeueWHs/dHctRzpIPlINYShOO6GSDA6YFK93uAUANlhSddrjPoe4ranNxd0IS3tVibKk1206imiWi1WggoASgAoAKAFoAKACgAoATFAC0AFABQAUAFABQAUAFABQAUAFABQAUAITiplJRV2BG7gDk4riq1r6FpED3Ma9XGfQc1z+znN7D0K736j7qk+5rWOGfVhcryXsjcbgPYVvHDxXQTZXMpY8kn6mt1CwrjGY1SihXEwT7mnYCSO2kf7q//AKqdhFmLTZGOTwKYF+G3W3Xao57152LndqJcV1HscKTjOB0rkirtJlozFspp2LyfJn16168sZTguWOpny3d2WorGGPBwWI7muGeLqT0vYrlQX0vlQbR1bj6VeDp88+Z9Ak7IyMZOBXstpbmFrkzWsiw+Y4CjsD1NYRxEZT5Il8mlyCukzCgAoAWgBKAFoAKACgAoABSAWgBKYBQAUAFABmgAoAKAJhbObfzh0BrndZRqcjLULq5DW5AtAwIIxnjPSkpJuwNOwUwLFjN5VwCT8p4NY14c8Ghp2Zs14TVtDYMA9RTWj0AKQEc8QmiZTjkcVcJOLAyHtJEGcfjXqRd1dENEWWU+n4UWQDhIPcUnELlmK7kQcMCPQ1jKjF62GmWo75TxINpHWueWHkvhHcspKj8qwP0rJqUd0MkBqoTtrcQ8Nmu6nVUtOpLQtaiFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAGSSrGuWIH1rGpVUNFqxpXKE+pBSQgz71hyTqay0K0RQkunc8sT7VtGko7IVyEufYVryoVw+Y+tOyAekDtjCn8uP8/5+jsIsR6dKx5osBbi0wDlj+RoAspZxJ0H/wBagCZUVRgCgBaAIWOTmvGqScpNs0QlQMKACgCjLbSXM25zsQcAd69COIhRhyx3FKN2WIbeOAfIvPcmuWpXnU+IaSWxV1STCqnrzXbgIauRM3ZGdXqGAqqXYKoyT0FKUlFXY0riuhjYq2MilCamrobVtBtUSFMAoAKACgAoAKACgA70AHSgAoAKACgAoAKQG3bRgWaIR1HNeLiKj9q5I3hojKuYjDMyngdq9ShU54XM5xsyKtiTUsNs1qUdQwU45FeZjLwkpRNKb6DZ9NBy0Rwf7p6VNLGSWkinFMoywyQth1wa74VoVFdGbg0a9pL5turdxwa8rFU+Sb8y4u6Jq5vmUFHQAqgFiGQQRXoYeV4Ey3GS2ccgIxjPvW5JSm0wgEpz/WmBRkt5I25H/wBelYBgZl4/KhpMCRJcEYJU1LjcdyzFeyL1+cehNYSop+Q7l6C7SXjO1vQ1g4SgxlpWzXTSqqas9yWh1biCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAGyMFQknHvQBj3Uy7jtJY+pqIxjFWihtlQRu54FWBPHYSv1Uj8KBFqLS+m4/5/z/AJ9GBajsYk7A0XAnWNF6CkA7pQAtABQAUANkOFrnxE+WA1uVpZUiGWP4V5sIOb0NCk+oHd8oAH86644VdRXLkEnmpnFc1WHJKw07klZgFACUAZWpMGuMDsK9vBR5aRnU7FeKJ5X2IMmuipUjTV5EJXNa3tUt1OOWI5Y14tbEyqu3Q2UUjKnOZm+te1SVoIynuR1oQFAFhLVjamb8hXNKulVVM0jG6K9dJmFMAoAKACgAoAci75FX1OKiTsmxj7mHyJSn5VnQqe0jcqcbbEVbEBTAWgB8Sb5UX1NRN2i2NG6AAuB2r55u92blXUIPNi3j7y11YSryTt0YNXVjJxXsmBf0uTbI0frzXFjIXhfsVF2ZpV5LZqIyqy4YAj3pptK6GRw26ws2zIB/hrSdWU1Z9BabktY+gC0wKl1ctA4GOD3renRjNag3YktbhZJB2bpit6UXTduhLd0Xa6iQoAY0asckdsUAVprCOToMfjTAozaa6cryPrQBUkhkjzuGP60WAQSMOv59/wDP+fpNh3LtresuFPzCsZ0U9VoNM04bhJeAefSqjKS0mJk1aiCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAhuITKuAcUARR2EanJ5oAnWGNOij8qAH4A7UALQAUAFABQAUAFABQBRvbtYuFwT+lcdWDqTt0LWiMmSdncnOa3hTSVhNhbxmSUDrV7IVzZjQRqAK8ecuZ3NAeRE+8QKIwctgFSRXGVNKUXHRgKeBmhK7sBkLC91O23gZ5J7V7c6saEEjNrmkakMKQR7EH4nqa8irVlUldmiVh7cAms46tAYL8uT6mvpI6JGEtxtUSPiQySKg7nFTOXLFsaNryV+z+UOmMV4Lq3qc50LQxZE2SMvoa92EuaKZhJWdhlaEhQAYpALg/hRcdgoESWwzcRjOOazq/Axo076DzYsjG5ea8nDVuSdn1N2rqxkV7RzhQAu07c4OPWlzK9h26lnT4y10Djhea5sVPlpsqK1NevF8jUOtNPYDGvIfJmOPutyK9nC1faQ1IqLqJZyCO5QngZxWtaPNBohaM2q8F3NgofYBksgiQsacYuT0AqLqHPK8eoroeFVtGK5bimSQZVgawlCUHqhjbiBZ4ip4PY+lVTm4NNAZtqWjuQG4IPevSVpK5DNxTkAiqEOoAKACgAoAY0at1AoAqzadG4+Xg9qYFGXTpIzlMn/AD/n/PUAfazmNgJl6d6NQNdTkZpALQAUAFABQAUAFABQAUAFABQAhOKACgBaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIcIT0oA564JeZu5J/OpSGya2sXkIJGB9aqwjTitkgXI61nWlywY1uQ3NyIRgcsa82lSc9XsaGZJM0j9c5PWvRhTS0IbNGzRlXJ6VxYmScrFIsOu5SM4zXPCXK7jEjjWJNqDApznKbvIErD6gBkpxEx9q0pK80howj1NfRnM9xKAL2mRbpGkP8PT61wY6pyw5V1LgtTTrxzUydQj2T7v73Ne3g581O3YioupVrsMidrSRYPNP5Y7VzLExdTkRfJdXIK6TM0JbbZp4GPmHJ4rzo108QzdR92xn16JiTWYzdR/Wsq/8ADY1ubRGetfP630NzIvYfKmOBhT0r28LV54eZnUXUrV1GZrQW6myCED5hn6V49etatddDaG2o3TothlyOQcVeMqKcI2Eo2Zdrg2KCkBWvLczRkgnI6CunD1uSRW6sZP3W9xXt7o5mjchbfCreorwcRHlm0bRd0PrFLUY2RN8ZU9CKuErNMZhyK0MhX0NepB80bmb0Y6OUg8EqfY0ONwuXoL7GBJ09a5Z0P5Srk8lskziRcA9yO9OhUafKwexcQbVArsIHUAFABQAUAFABQAmKAGNCjHJUZp3AeqhRgdKQC0AFABQAUAFABQAUAFABQAUAJigBaACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAGTIXjKjvQBWhsVRizcmgC2qhRgCgCpf3IhUAdaxqx51YqOhivI0jHk89auMEhNlm0s2kYFhgCr2EaigKMDoK8ao7zbNVsB4FQBWmvUj4Ubq6IYdy30Fcfb3HndsVNWj7ME7i3bbbdvcVWGV6qGYte+c4AFiAOppN2V2BuQR+VAqdwOa+fr1PaVGzeKsh4YHoays0Mq6jFvg391rtwVRxny9xS1ViGxtNxEsg47KR1963xeJt7kSIx6mgwDKQe9eZFtO5ojKS1P23yz0Bz0r2XiP3POjNx941WXKkY4Irx4yalc0RhyoY5GU9jX0FOXNFMxmrMn04ZugfQVji3akwjua1eEbEN3CJoSO45FdOHq+zlcN9DJjjLzLH3JxXtSmlDmRhazszcAwoHoK+fnLmd2bC9KTb2uMZK4jQse1OMeZ2Aqx3wZ8EYFdMsNZXTJuXAcjiuZJp2GZd/b+VJvUYVq9fCVeaPK9yZrqW9OcNbBe6mubHQ97m7ig+harhLChXAh8hJZHVh15r0MO/dsTIp3GmuhLJyK6SSmd8Zwe1DQE9tdNGwAyfasp0lIaZtQSiaMMKuDdrMRJVAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBjamd8+BnOOKQx1nYFsM/anYRphBGmAOBUydk2CIXcIu5jivHScnoamfc3hYYU4X+ddtKgo6vcTZSyzsBzzXWo2IubFrEEjBxgkV52JneVi47EeonFv9TWmBV6gS2MqvaMC1p0W+fd2SuPGVeSFu5UVdlu/m2JtBxmvNw8LvmZs9ilbzMGBya7ZwTiQjVG2SPkAg9a8zWEtC0Vp7zyn2IB6V0U6HP70hN2JrecTD0NZVaXICdyTy1Em/HzYxmp9o+XlvoMdWdwM3U48SLIOhGK9fA1Lx5X0ImtLiaWMzMfQVpjX+7IhuadeIbBTQFf7Ni9EwAxjn612RxH7pwYmr6liuIYtPcRFcruhIrSk7SQzHT5T7E8V6u6MzUs5t6YPUV59eHK7otEs8QmiKn8DUUqjpyTQ0U9OzHNJG3Br0MV+8pqSM0uWVjQry77FhR8wGjiZfeuvDPWwpbFiu4ggmtI5R0wfWncDNuNPeMlk6daALunyNtKsuCOtIC7QAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFc2iGXeaAJwABgUARXMixREt+FZ1U3BpDjuY1zcmRsfpWVKkorQpsgVGkbjk/WuhKxFzTtLDbhnFPYC0BjpXjVHebZqUtUP7pR6mu7L17zZM/hM2vWMTXs4vItwT1bk14eLqe0qWXQ2grIz7uTzZTj1rpow5UEmHktEAT3roa0JRbS5CwEE/NXBOi3MtMz3Yu+fSuyKsQ2WrSTa49/0rKvDmiNGoDkV5exYHpQnYCC8i82A+q8104apyTC19CtpQO6T8K7se1yIyhuaFeQakc0yxDLd60hTlN6ALFKsgyKbg4P3hbj2IHOeKhq7shiBgehpWs9QI7k4iNa0lqBUFv5lsWHUdTXqx2M+pDBIY3B/A1nVgpIaZqo25Qa8trlbTKK88ey5jmX1w1dlCreDpsUldehari+Qwp9QGPwVPvW9CXvIHsWR0r0jMWgBOtACBFByABQA6gAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAzNWb5VXNJoaKEFs8rYA4osI2La0WFeRzTAsNwtTPSLGiGvFNDP1Q/cGfwr1MvWjZE9irZxebcBSMqOTXXiKns4NkRV2aV3J5cJA7149KPNO7NuhnWsZlnB/KvUirGbNW7gH2bgdBTEjHkOB7moa1KLenW2/5iKskZcR+TOR2zmlJXQ0XraTfGPXvXk1o8si0SllXqQKzUW9hgCGHBBo1TArWcflyTcY54rtxFTmpxsxW95lquEZn6n/AAn3rtwopbCWUmGAPQ1piIXQkLqMxB2g1GGjpcciK1nKOO4PWtqtNSRKZeunHkEg9a46UfesX0JLFQbcDtXpoyM+9h8mbI4U0xk9lN/AT9K4MRTt7yKRcZQ64Nc8ZOLuUKOB1qG1qxBTW4DZB8vSqg2mmMnjOUBzmvWWxkOpgFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFa4tBOwJPSgCWKFYlwBQBJQAyQ/LWFeVoMcdyKvKNDL1JszAegr2cDG1O5FToWNOi8uAswwWOfwrlx1TmnyroEFZFbUJd0mB0qsPC0SpMt6VDhdxFdZkaDLuUigZiT2x+1bQOM0WA17aIRRgCgCvqMWU3jqKAKdtOIs5PHauWvT5i0yC4uGkk9v5VdOmoqwmy5YyHJBNc+JhbVDRcAA5A69a47vYoWgDPvgWlVfeu7C7ClsQYMLkenTiuuautSEMcmaYDvU0422BsWSFoGA7HvWjWgh7TN5Ww9Kw5FzXLua1kP3C1uQJeQCaI8c0AZCkxvg9QaicbjRqwSCRAeM968upDkZZJUsApL1ARhlSKpaAPtz+7x6GvVpu8UyHuS1YgoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAil7Vx4t+6kXEZXnlGXMnnahs5xnn6V7VOSp4dSInrKxfmcRQntxgV5MU5zL2MlQZZ+mea9WCsZyN63Ty4gMYqxEtADDGpbdjmgB1ADZl3xkUAYMw8tmBzwaTWgxtvA0zZppWEWICYnweueaxrRUolI0lORXlNFi0gKM43XSDvXo4bYmYt/Ft2sPxrrIK9jH5k+fekgZpXtuJIenIFMDHwQdh6g0mhm7arthX6UxE1AGTqNuUfeo4oGNs5trBT0PTPauSvTuikzRHPNcHUYU1ogCmAW/DuPevRoO8SZbk9bkid6AFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgCGT71efi5e8kXHYYeATXGtWUVbSPMssp6lsDNd2JnaEYIX2mRajL/AO1LDQ6jYaXDubcRXeZM16AFoAKACgBMUAZeo2xaQMooAs2NuI48nrQBUvE8ufPQGk1dDRat33RivJrR5ZFolNZDKOd14B6V6mHVokzLt3HvgIx2roIK+mwbCSR+lMDQIyKQGZd2hE4ZB+lMDQhG2JR7UgJKAIp4hLGQaAMR1MMpU9AeKUlcaNO2lEie4615dWHJLyLRNWWgBTtrsA2M4nHuK7cM+gpFmuwgKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIGOWNeTiJXmzRbCViMYxWKPPQAVSvOQGRKxmnr1aUeVWIkzas4vLiHHJrUksUAFABQAUAFACFQeooAOlAFPUY8puA6UAV7J+cZrgxMOpaLh6VxooowAm+avWo/CRLc1sDGK1JEVQvQYoAdQAmKAFoAKACgDO1K3ziReooAq2kuxhngH9K560OZFI0wcjNea7rRlC0wGN8sin3rowztKwS2LVeiZhQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACE4FAEHevFm7ybNQqAKeoS7VC/yrrw0Lu4PQr6dF5kuT0zmvRSsZM2wMCmAtABQAUAFABQAUAFAEcyb4yKAMiMmObHocVjVjeJSNEnKZry7WZaKtlzdOa9akvdM5bmpWggoAKACgAoAKACgBrrvUigDDuIzBORjg0mroZes5t6bSeRXnV6fK7opFmsE2MZJ0yO1XTdpAWEOVBr1jMdQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFADXOFqKkuWLY0Q14xoIxwCT2oSvoBj3TmWbAr1aMOVWJkzV06LZED610GZcpDCgAoAKACgAoAKACgBD0oAybxPLnyD1pSV0NE6Put68yUbVDRbDNNGZGJ9a9KGiMnuadUAUAFABQAUAFABQAUAU9Qg8yIsOooAzYJDHID6cVlUgmikaqMHUEV5ck4uxQrDINUtwH25zEPavVg7xTIe5LVCCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAjlPGK58S7U2VHcjryyyveS+XFgdTW1CHNK4GfaRmWbOOM16sVYyZvIoVQBTAdQAUAFABQAUAFABQAUAFAFPUUzFuHagCpBJhGBPb865asfeuWixpg+UmuiOxD3L9UAUAFABQAUAFACd6TvcBaYCEZGKAMW9gMMxYcKetDGieymz8hP0rgxNPS6KRd7VzLcYW5wWX0NelQd4IiW5PWwgoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAIpeoFcOLeyLiMrgKMq/l3ybR9K9LDwtEmTLumQbU3kV1kGhQAUAFABQAUAFABQAUAFABQAyZN8ZFAGI2Y2I7DiomrjRo6YP3P1q1sIu0AFABQAUAFABQAUAFABQBXvIBNERjmgDHQmKTHdT+dTON0NGtDIJEBzXmTjyysWOi4mPuK68M9GTIn711Ei0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFACZ+bGOPWgBaACgAoAKACgAoAKACgAoAKACgCF/vV5uLd52LjsQ3D+XETWFOPNKxRkxKZp/xr14KyM2zehQRxgCqESUAFABQAUAFABQAUAFABQAUAFAGNqEeyUnHWiwy/p64gH9KBFqgAoAKACgAoAKACgAoAKACgDJ1KDY/mLxTAbZTYbb2PT2rjxFO6uWi/nEqn161GHl71gktCzXcQFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBATlia8itLmmzRbGdqMvRR2row0OrBuw/S4Pm3HtXfYzNWgAoAKACgAoAKACgAoAKACgAoAKAKd/FvUY60wJrVdsIpATUAFABQAUAFABQAUAFABQAUARzxiSMqaAMMgxSlT2PHvSkroZpJJvjVhyQea4YrkqF7ouqcgGu8zFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAQnApPYCtI2xGb0rx7c07GpjuTNcfU16tONlYhs3LSPy4QO/etCSagAoAKACgAoAKACgAoAKACgAoAKAEIz1oAWgAoAKACgAoAKACgAoAKACgAoAKAM7U7fI8xeopgVrSUj5egPT2rnrQ6lI1oG3RA1sndEklMAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgBrnC1nVdoNjW5n38uyLb0zXDh4XdzR7FXT4TJKG9DXpLYyZtgYGKAFoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAbIodCp70AYkyGC4PXk0NXQzUsX3w5zUwVlYTLNUAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQBHKcCubFO0LFR3MW9k3zkA/lRQhaKHI0tOhEcQbueldJmXKBhQAUAFABQAUAFABQAhIHU0ALQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFAFLUbfzI9w6imA3SydrKTSAv0AFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAV7t9kZPtXLX1aiXEx7ZDNcZPrXRFWRL1N5F2qBVCHUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAUAFABQAjDcMUAQwweVIxHQ9qAJ6ACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAMzVnIAUdDWDV6ha2F0uJSu4jJ6it+hFzSoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//9k=',
												  width: 200
												//image: 'image/waec.jpeg'
											},
											
											{    
													alignment: 'right',
												   // width: 100,
												   stack:[
						
														  '21, HUSSEY STREET,',
														  'PRIVATE MAIL BAG 1022,',
														  'YABA, LAGOS, NIGERIA.',
														   'TEL: 01-8961016',
														 ]
											}
												
															  
															  
										]
									},
									{
										 margin:[0,-5],
										canvas: [
						
													{
														type: 'line',
														x1: -10, y1: 8,
														x2: 530, y2: 8,
														//lineWidth: 3
													},
												]
									},
									{
									  fontSize: 11,
									  margin:[0,8,0,-3],
									  columns: [
						
												  {
													text: newValue.ref_no, alignment:'left', bold: true
												  },
						
												  {
													text: 'CONFIDENTIAL', bold: true, alignment: 'center', fontSize:14, decoration: 'underline'
												  },
						
						
												  {
													text: nowDate, alignment: 'right'
												  }
						
											]
									},
									{
									  margin:[0,8,0,5],
									  fontSize: 11,
										bold:true,
									  columns:[
						
												[
												  {text: newValue.dest_title},
												  {text: newValue.dest_address1},
												  {text: newValue.dest_address2},
												  {text: newValue.dest_location}
												],
						
											  
											  //alignment: 'left',
												  { 
													  alignment: 'right',
													  columnGap: 300,
													  fit: [110, 90],
													  width: 150,
													  height: 150,		
													  image: 'data:image/jpg;base64,'+$scope.resultDetail.Picture, 
												  },
											  
										  ]
									},
						
									{
										text:' CONFIRMATION OF RESULT\n',bold: true, alignment: 'center', fontSize:14, decoration: 'underline'
									},
						
									{
									   margin:[0,7,0,5],
										//columnGap: 20,
										fontSize: 11,
										bold:true,
									  columns:[ 
												{ 
												  width: 150,
						
											   text: [
												  {text: 'NAME OF EXAM:\n'},
												  {text: 'NAME OF SCHOOL:\n'},
												  {text: 'CANDIDATE\'S NUMBER:\n'},
												  {text: 'CANDIDATE\'S NAME:\n'},
												  {text: 'ADDRESS:\n'},
												  {text: 'SEX:\n'},
												  {text: 'DATE OF BIRTH:\n'}
												]
											  },
												{
						//`${subHeading}\n\n`
												  text:[
																		  {text: $scope.resultDetail.ExamDiet+' '+ $scope.resultDetail.ExamYear+'\n'},
																		  {text: $scope.resultDetail.CentreName+'\n'},
																		  {text: $scope.resultDetail.CandNo+'\n'},
																		  {text: $scope.resultDetail.CandName+'\n'},
																		  {text: newValue.Cand_address+'\n'},
																		  {text: $scope.resultDetail.Sex+'\n'},
																		  {text: $scope.resultDetail.DOB+'\n'}
																		]
																	  },
						
									  ]
									},
						
									{
									  margin:[0,5,0,5],
									  fontSize: 11,
									   text:[
											  {text:'Please find forwarded to you the confirmation result of the above named candidate.\n' },
											   'The details of ', {text:  $scope.hisHers($scope.resultDetail.Sex), bold:true},' performance at the examination are as follows.'
										]
									},
						
									  {
										
									  columns: [
										  { width: '*', text: '' },
										  {
											  width: 'auto',
											  fontSize:10,
											  bold: true,
												//widths: ['*', '*', '*'],
						
												  table: {
						
						
														  body: [
																   [
																	{text:'', margin:[90,0,60,0], alignment:'left'}, 
																	{text:'', margin:[30,0,60,0], alignment:'left'}, 
																	{text:''}
																  ], 
																  [
																	{text:'SUBJECT', decoration:'underline', alignment:'left'}, 
																	{text:'GRADE', decoration:'underline', alignment:'left'}, 
																	{text:'INTERPRETATION', decoration:'underline'}
																  ],
																  [{text:$scope.resultDetail.Subject1}, {text:$scope.resultDetail.Grade1}, {text: $scope.gradeIntepretation( $scope.resultDetail.Grade1)}],
																  [{text:$scope.resultDetail.Subject2}, {text:$scope.resultDetail.Grade2}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade2)}],
																  [{text:$scope.resultDetail.Subject3}, {text:$scope.resultDetail.Grade3}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade3)}],
																  [{text:$scope.resultDetail.Subject4}, {text:$scope.resultDetail.Grade4}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade4)}],
																  [{text:$scope.resultDetail.Subject5}, {text:$scope.resultDetail.Grade5}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade5)}],
																  [{text:$scope.resultDetail.Subject6}, {text:$scope.resultDetail.Grade6}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade6)}],
																  [{text:$scope.resultDetail.Subject7}, {text:$scope.resultDetail.Grade7}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade7)}],
																  [{text:$scope.resultDetail.Subject8}, {text:$scope.resultDetail.Grade8}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade8)}],
																  [{text:$scope.resultDetail.Subject9}, {text:$scope.resultDetail.Grade9}, {text:$scope.gradeIntepretation( $scope.resultDetail.Grade9)}],
																  [{text:'NO OF SUBJECTS LISTED:', margin:[0,10,0,0]}, {text: $scope.subjOrdinal($scope.resultDetail.NoOfSubjects)+' (' + $scope.resultDetail.NoOfSubjects+')', margin:[0,10,0,0]}, {text:''}],
														  ]
												  },
												  layout: 'noBorders'
										  },
										  { width: '*', text: '' },
									  ]
								  },
						
								  {
									margin:[0,5,0,10],
									fontSize: 11,
									text: [   
											'You will have to satisfy yourself that ', 
											{text: $scope.heShes($scope.resultDetail.Sex ), bold:true}, ' and ',
											 {text:$scope.resultDetail.CandName.trim(), bold:true}, 
											 ' of our records are one and the same person.'
						
										  ]
								  },
						
								  {
									text: 'Certified by:'
								  },
						
								  {
									margin:[0,33,0,33],
									stack:[
										{text: $scope.signatory[0][0][1] + " "+ $scope.signatory[0][0][2]+ " " + "(" + $scope.signatory[0][0][0] +")" , bold:true},
										//{text:'ADEKUNLE R.O. (MRS)', bold:true},
										{text: 'RESULTS OFFICER'},
									]
								  },
						
								  {
									margin:[0,2,0,17],
									stack:[
										{text: $scope.signatory[1][0][1] + " "+ $scope.signatory[1][0][2]+ " " + "(" + $scope.signatory[1][0][0] +")" , bold:true},
										//{text:'JOHN-NWAFA H.A. (MRS)', bold:true},
										{text: 'For: HEAD OF NATIONAL OFFICE'},
									]
								  },
						
								  {
									  margin:[0,-8,0,0],
									stack:[
						
									  {
										text: 'NOTE: ANY ALTERATION ON THIS SHEET RENDERS IT INVALID.', 
										bold: true,
										fontSize: 11,
										decoration: 'underline'
									  },
									  
									]
								  }
						
						
								],
						
						
								footer : function(currentPage, pageCount) {
								return {
									margin : [ 20,-8, 20,20],
									fontSize : 10,
						
						
										stack:[
												{
												  canvas: [
						
															  {
																  type: 'line',
																  x1: -10, y1: 8,
																  x2: 570, y2: 8,
																  //lineWidth: 3
															  },
														  ]
											  },
						
											  {
											  columns : [
																			{
																			   alignment : 'left',
																					  bold : true,
																				stack: [
						
																					{
																					  text : 'Patrick E. Areghan, FCGP' ,
																				 
																					},
																					{
																					  text:'Head of National Office'
																					}
						
																				]
																			},
																		   
																			{
																					  alignment : 'right',
																					  bold : true,
						
																				stack:[
						
																					{
																					  text : 'Email: hno@waecnigeria.org',
																					  
																					},
						
																					{
																					  text: 'Websites: waecnigeria.org, www.waecdirect.org, www.waeconline.org.ng'
																					},
																				]
																			} 
						
																		]
											}
										]                            
								};
							},
						
						  //   header: function(currentPage, pageCount, pageSize) {
						  //   // you can apply any logic and return any valid pdfmake element
						
						  //   return [
						  //     { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
						  //     { canvas: [ { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 } ] }
						  //   ]
						  // },
								styles: {
									header: {
										fontSize: 20,
										bold: true,
										alignment: 'center',
										margins: [20,10,20,10],
										width: 'auto'
									}
								}
							};
						
							 //pdfMake.createPdf(docDefinition).open();
							 //pdfMake.createPdf(docDefinition).open(newValue.ref_no+'.pdf');
					 		pdfMake.createPdf(docDefinition).download( newValue.WES_Ref+'.pdf');

							 //  //var Unit8data;
								 const pdfDocGenerator = pdfMake.createPdf(docDefinition);
								 console.log(pdfDocGenerator);
								// pdfDocGenerator.getBase64((data) => {
								// 	//alert(data);
								// 	binaryData = data;
								// 	//console.log(data);
								// });

								// // // if (confirm("You are about to delete a record, Are You Sure?") == true) {


								// // // }

									var data;
								pdfMake.createPdf(docDefinition).getBuffer(function(buffer) {
								    // turn buffer into blob
								    data = buffer;
								    $scope.binaryData = buffer;
								    //alert(data);
								   console.log( $scope.binaryData);
								    	var data = ({
							                fileName: newValue.WES_Ref+'.pdf',
							                attachment: buffer
							            });

							            console.log( data);

							            			let token = window.sessionStorage.getItem('token');

											// $http({
											// 	method: 'PUT',
											// 	url: "http://localhost:5000/applicants/"+newValue.WES_Ref+".json",
											// 	headers: {
											// 				Authorization :`Bearer ${token.replace("\"", "")}`,
											// 				Content_Type :  'application/json'
											// 			},
											// 	confirmPDF: angular.toJson(data)
											// 	})

											// // $http.get("http://localhost:5000/applicants", 
											// // 		 {"params": { "ref_no": ref_no}})
											//   .then(function(response) {
											//   	// body...
											//   	alert('PDF file was successfully sent');
											//   	console.log(response.data);

											//   }, function(response) {
											//   	// body...
											//   	alert(response.status);
											//   	console.log('There was an error with the file upload');
											//   });


								});

								


					}, function() {
						// body...
						alert("Error getting the signatories");
					});

					// $scope.$on('sign', function(event, obj){
					// 	$scope.signatory = obj.retSignatories;
					// };
		
					console.log(signatory);
		
					console.log($scope.resultDetail.CentreName);
		

		
			});
		
				});



		};


			// 	$scope.$watch('signatory', function(newValue, oldValue){
			// 	window.sessionStorage.setItem('signatory', newValue);
			// 	//window.localStorage.setItem('currentMData', newValue);
			// });

					
		}, function() {
			// body...
			alert("Error getting the signatories");
		});

		console.log($scope.signatory.length);

	
	};


	console.log($scope.binaryData);


	
}]);