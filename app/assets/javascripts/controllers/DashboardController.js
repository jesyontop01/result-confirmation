angular
  .module('verifier')
  .controller("DashboardController",['$scope', '$http', function ($scope, $http) {
  	// body...
  	// $scope.message = "I love Jesus";

  	//  $scope.boxValue='';
   //  $scope.persistedValue = 'abc';
   //  $scope.doneEditing = function(v) {
   //    if (v !== $scope.persistedValue) // only save when value is different
   //      $scope.persistedValue=v;
   //  }

			//     $scope.receipt_no = {}
			// 	$scope.result = false;
			//     $scope.confirmReceipt = function(receipt_no) {
			//  	// body...
			//  	//$scope.result.receipt_no = receipt_no;

			//  	$http.get('/receipt_statuses.json', 
			//  		{"params": { "receiptNo": receipt_no}
			//  	}).then(function(response) {
			//  		// body...
			//  		$scope.receipt = response.data[0];
			//  		console.log($scope.receipt.status);
			//  		//debugger
			//  		if ($scope.receipt.status === "UNUSED") {
			//  		//debugger	
			//  		$scope.result = true;
			//  		//debugger
			//  		}
			//  		else{
			//  			alert("Sorry, This receipt has being used");
			//  			$scope.result = false;
			//  		}
			//  	});

			//  	}

  }]);