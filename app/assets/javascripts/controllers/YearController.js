 angular.module('verifier')
	.controller('YearController',['$scope', '$http','$window', function($scope, $http, $window){
	$scope.years = [];
	 $scope.loading = false;

	$http.get("/years.json").then(function(response){
		 $scope.loading = true;
		$scope.years = response.data;
		//console.log($scope.years);
		 $scope.loading = false;
	},function(response){
		alert("There was a problem: " + response.status);
	});

	var yearSelected = $scope.ExamYearId;

	$scope.$watch('ExamYearId', function(newValue, oldValue){
		window.sessionStorage.setItem('yearID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})	

}]);