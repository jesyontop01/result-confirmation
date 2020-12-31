angular.module('verifier')
	.controller("ConfirmPaymentController", [ "$scope", "$http", "$location", "crudService",'$window', "$routeParams",
		'ExamDietService',"ConfirmationService", "ResultService", 'ReceiptListService', 'Receipt', 'myAppFactory', '$filter','uibDateParser',
		function ($scope, $http, $location, crudService,$window, $routeParams, ExamDietService, 
			ConfirmationService, ResultService, ReceiptListService, Receipt, myAppFactory, $filter, uibDateParser) {


$scope.results = {};
		let year_id;
		let diet_id ;
		//confirm.DietName confirm.YearName confirm.exam_no

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

		$scope.confirm = {};

	$scope.viewDetails = function(confirm){

		$scope.DietName = confirm.DietName;
		$scope.ConfirmID = confirm.id;

					$scope.$watch('DietName', function(newValue, oldValue){
						window.sessionStorage.setItem('DName', newValue);
						//window.localStorage.setItem('currentMData', newValue);
					})

					$scope.$watch('ConfirmID', function(newValue, oldValue){
						window.sessionStorage.setItem('confirmID', newValue);
						//window.localStorage.setItem('currentMData', newValue);
					})

			$location.path("/verifer/"+ confirm.YearName +'/' + confirm.exam_no );
		}


	   		$scope.result = [];
	$scope.getResultDetails = function () {
debugger
	console.log(confirm);
 	var exam_no = $routeParams.exam_no;
 	var Year = $routeParams.YearName;
 	let Diet = window.sessionStorage.getItem('DName');

 	console.log(exam_no, Year, Diet);


	$http.get("/test_results.json", 
				   {"params": { "CandNo": $routeParams.exam_no, "YearName": $routeParams.YearName, "DietName": Diet}}
			).then(function(response){ 
    							//alert('Record successfully updated .');
							    $scope.result = response.data[0];
							    console.log( $scope.result);
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
    };


	$scope.addressDetails = function(result){

				$scope.DietName = result.ExamDiet;

						$scope.$watch('DietName', function(newValue, oldValue){
						window.sessionStorage.setItem('DName', newValue);
						//window.localStorage.setItem('currentMData', newValue);
					})

			if (result.Picture == null) {
				alert("Sorry !, Confirmation cannot be Generated without Picture.\nRequest Picture upload at ICTD");
				$location.path("/search");
			}
			else{

				$location.path("/verifer/address/"+ result.ExamYear +'/' + result.CandNo );
			}
			
		}


	   		$scope.result = [];
	$scope.resultForAddress = function () {

	console.log(confirm);

	console.log(confirm);
 	var exam_no = $routeParams.CandNo;
 	var Year = $routeParams.ExamYear;
 	let Diet = window.sessionStorage.getItem('DName');
 	let ConfirmID = window.sessionStorage.getItem('confirmID');

 	console.log($routeParams.CandNo, $routeParams.ExamYear, Diet);

	// $http.get("/payment_search.json", 
	// 			   {"params": { "CandNo": $routeParams.CandNo, "YearName": $routeParams.ExamYear, "DietName": Diet}}
	// 		).then(function(response){ 
		$http.get("/payment_searches.json", 
				   {"params": { "id": ConfirmID}}
			).then(function(response){
    							//alert('Record successfully updated .');
							    $scope.result = response.data[0];
							    console.log( $scope.result);
    			},function(response){
    				alert('There was a problem:' + response.status);

    			});
    };

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

   			DietName:  $scope.result.DietName, 
	  	    YearName:  $scope.result.YearName, 
		    exam_no:  $scope.result.exam_no,
		    receipt_no: $scope.result.receipt_no,
		    Cand_address: $scope.result.Cand_address,
		    dest_title: $scope.result.dest_title,
		    dest_address1: $scope.result.dest_address1,
		    dest_address2: $scope.result.dest_address2,
		    dest_location: $scope.result.dest_location,
		    paymentID:         $scope.result.id,
		    dest_email: $scope.result.dest_email,
		    WES_Ref:  $scope.result.WES_Ref

		};

		console.log( $scope.applicantResult);
	
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

		// $http({
		// 	method: 'POST',
		// 	url: "/confirmations.json",
		// 	data: angular.toJson($scope.applicantResult) ,
		// 	header: {
		// 				'Content_Type' :  'application/json'
		// 				}
		// 		})
		// 		.then(function(response){
		// 					// body...
		// 		alert('confirmation was created successfully.');
		// 		$scope.closeModalSave('#myModalSave');
		// 		$location.path('/confirmations');
		// 		}, function(response) {
		// 					// body...
		// 			alert("An Error occurred");
		// })
   // }


   $scope.result.receiptID = 0;

   		// 	$http.get('/receipt_statuses.json', 
			 	// 	{"params": { "receiptNo": $scope.result.receipt_no}
			 	// }).then(function(response) {
			 	// 	// body...
			 	// 	$scope.receipt = response.data[0];
			 	// 	console.log($scope.receipt);
			 	// 	result.receiptID = $scope.receipt.id;
			 	// 	console.log($scope.result.receiptID);
			
			 	// });
	$scope.ReceiptID = function(receipt_no) {
			 	// body...ss
			 	if (receipt_no != null) {


			 	$http.get('/receipt_statuses.json', 
			 		{"params": { "receiptNo": receipt_no}
			 	}).then(function(response) {
			 		// body...
			 		$scope.receipt = response.data[0];
			 		return $scope.result.receiptID = $scope.receipt.id;
			 		console.log($scope.result.receiptID);
	
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
			 		console.log($scope.receipt);
			 		//debugger
			 		if ($scope.receipt != null && $scope.receipt.status === "UNUSED") {
			 		//debugger	
			 		$scope.receiptConfirm = true;
			 		$scope.result.receiptID = $scope.receipt.id;
			 		console.log($scope.result.receiptID);
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

		$scope.getAllPayments = function(){
		    		 myAppFactory.getData().then(function(response){
					    		$scope.confirms = response.data;
					    		console.log($scope.confirms);					  
						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
		    		 //getFilteredData: function (officeID, startDate, endDate)
			};

confirm

        $scope.gridOptions = {
            data: [],
            urlSync: true
        };

        myAppFactory.getData().then(function (responseData) {
            $scope.gridOptions.data = responseData.data;
        });

        // myAppFactory.getData().then(function (responseData) {
        //     $scope.confirms = responseData.data;
        // });

        // $scope.exportToCsv = function (currentData) {
        //     var exportData = [];
        //     currentData.forEach(function (item) {
        //         exportData.push({
        //             'Candidate Name': item.CandName,
        //             'Amount': item.amount,
        //             'Receipt No': item.receipt_no,
        //             'Transactn Type': item.transName,
        //             'Office': item.office_name,
        //             'Trans-Date': $filter('date')(item.created_at, 'shortDate')
        //         });
        //     });
        //     JSONToCSVConvertor(exportData, 'Export', true);
        // }

        $scope.exportToCsv = function (currentData) {
            var exportData = [];
            currentData.forEach(function (confirm) {
                exportData.push({
                    'Candidate Name': confirm.CandName,
                    'Amount': confirm.amount,
                    'Receipt No': confirm.receipt_no,
                    'Transactn Type': confirm.transName,
                    'Office': confirm.office_name,
                    'Trans-Date': $filter('date')(confirm.created_at, 'shortDate')
                });
            });
            JSONToCSVConvertor(exportData, 'Export', true);
        }

        function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}





					

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

    	console.log(idYear);

    	//.......................


  		let idDiet = $window.sessionStorage.getItem('examID');

   	    console.log(idDiet);

    	
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

$scope.today = function() {
    $scope.dateFrom = new Date();
    $scope.dateTo = new Date();
  };

  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
    $scope.dateFrom = null;
    $scope.dateTo = null;
  };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    //$scope.dt = new Date(year, month, day);
   $scope.dateFrom = new Date(year, month, day);
   $scope.dateTo = new Date(year, month, day);

  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

  // $scope.format = 'yyyy/MM/dd';
  // $scope.date = new Date();

  $scope.getDate = function(WaecOfficeId, dateFrom, dateTo) {
  	// body...
  	$scope.WaecOfficeId = window.sessionStorage.getItem('officeID'); 
	   //$scope.date = $filter('date')(Date.now(),'yyyy-MM-dd')
	$scope.dateFrom = $filter('date')(dateFrom, 'yyyy-MM-dd'); //dateFrom;
  	$scope.dateTo = $filter('date')(dateTo, 'yyyy-MM-dd');// dateTo;


  	console.log($scope.WaecOfficeId, $scope.dateFrom , $scope.dateTo);
  			    		 //myAppFactory.getFilteredData($scope.WaecOfficeId, $scope.dateFrom , $scope.dateTo)

  			if ($scope.WaecOfficeId == undefined) {
  				$http({
                    method: 'GET',
                    url: '/payments.json',
                     params: {
                            dateFrom: $scope.dateFrom,
                            dateTo: $scope.dateTo
                        }
                }).then(function(response){
					    		$scope.confirms = response.data;
					    		console.log($scope.confirms);					  
						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
  			} else {
  				$http({
                    method: 'GET',
                    url: '/payments.json',
                     params: {
                            WaecOfficeId : $scope.WaecOfficeId,
                            dateFrom: $scope.dateFrom,
                            dateTo: $scope.dateTo
                        }
                }).then(function(response){
					    		$scope.confirms = response.data;
					    		console.log($scope.confirms);					  
						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
  			}
  			   // $http({
        //             method: 'GET',
        //             url: '/payments.json',
        //              params: {
        //                     WaecOfficeId : $scope.WaecOfficeId,
        //                     dateFrom: $scope.dateFrom,
        //                     dateTo: $scope.dateTo
        //                 }
        //         }).then(function(response){
					   //  		$scope.confirms = response.data;
					   //  		console.log($scope.confirms);					  
						    		
					   //  	}, function(response){
					   //  		alert("There was an Error:");
					   //  	});
		    		//  //getFilteredData: function (officeID, startDate, endDate)


  }
 
			


	
}]);