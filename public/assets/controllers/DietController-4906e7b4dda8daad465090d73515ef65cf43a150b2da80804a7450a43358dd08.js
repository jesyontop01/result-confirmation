
angular.module('verifier')
  .controller('DietController',['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.diets = [];

	$scope.loading = false;

	$http.get("/diets.json").then(function(response){
		$scope.loading = true;
		$scope.diets = response.data;
		//console.log($scope.diets);
		$scope.loading = false;
	},function(response){
		alert("There was a problem: " + response.status);
	});

		var dietSelected = $scope.ExamDietId;

		$scope.$watch('ExamDietId', function(newValue, oldValue){
		
		window.sessionStorage.setItem('examID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})

	//console.log(dietSelected);
}]);
