angular.module('verifier')
  .controller('StatesController',['$scope', '$http', '$window', 'Auth', function($scope, $http, $window, Auth){
	$scope.diets = [];

	$http.get("/waec_offices.json").then(function(response){
		$scope.states = response.data;
		console.log($scope.states);
	},function(response){
		alert("There was a problem: " + response.status);
	});



		var officeSelected = $scope.WaecOfficeId;

		console.log(officeSelected);
		

		$scope.$watch('WaecOfficeId', function(newValue, oldValue){
		window.sessionStorage.setItem('stateID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})

	//console.log(dietSelected);
}]);
