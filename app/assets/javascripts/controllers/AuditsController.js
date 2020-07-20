angular.module('verifier')
.controller('AuditsController',['$scope', '$http', '$window','$location', 'ReceiptListService', 
			function($scope, $http, $window, $location, ReceiptListService){

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

						   	alert("New Receipt Booklet Range logged ");
					    		//console.log($scope.confirms);
					    		//debugger;
					    		$scope.receiptLists = response.data;
					    		console.log($scope.receiptLists);
					  			ReceiptListService.setReceiptStatus($scope.receiptLists);
						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
				    	};

				    	$scope.getAllNewReceipts = function() {
				    		// body...
				    		$scope.receiptLists = ReceiptListService.getReceiptStatus();
				    	}

}]);