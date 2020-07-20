angular.module('verifier')
  .controller('OfficesController',['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.diets = [];

	$http.get("/offices.json").then(function(response){
		$scope.offices = response.data;
		console.log($scope.offices);
	},function(response){
		alert("There was a problem: " + response.status);
	});

		var officeSelected = $scope.WaecOfficeId;
		
		$scope.$watch('WaecOfficeId', function(newValue, oldValue){
		window.sessionStorage.setItem('officeID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})

	//console.log(dietSelected);
}]);
