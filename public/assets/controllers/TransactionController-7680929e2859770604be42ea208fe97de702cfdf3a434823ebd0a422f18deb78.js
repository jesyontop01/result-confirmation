angular.module('TransactionController', [])
.controller('TransactionCtrl', [ '$scope', '$http', 'TransType', function ($scope, $http, TransType) {
	// body...
	 var vm = this;

	TransType.getTransactionTypes().then(function(response) {
		// body...
		
		vm.TransTypes = response.data;
		//console.log(vm.TransTypes)

	});

	// var officeSelected = $scope.WaecOfficeId;

	// 	console.log(officeSelected);
		

	// 	$scope.$watch('WaecOfficeId', function(newValue, oldValue){
	// 	window.sessionStorage.setItem('officeID', newValue);
	// 	//window.localStorage.setItem('currentMData', newValue);
	// })
}]);
