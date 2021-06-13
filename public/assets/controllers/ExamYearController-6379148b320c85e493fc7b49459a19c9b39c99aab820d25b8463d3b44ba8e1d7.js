angular.module('verifier')
	.controller('ExamYearController',['$scope', '$http','$window', function($scope, $http, $window){
	$scope.years = [];

	$http.get("/years.json").then(function(response){
		$scope.years = response.data;
		console.log($scope.years);
	},function(response){
		alert("There was a problem: " + response.status);
	});

	var yearSelected = $scope.ExamYearId;

	$scope.$watch('ExamYearId', function(newValue, oldValue){
		window.sessionStorage.setItem('yearID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})


	

}]);
