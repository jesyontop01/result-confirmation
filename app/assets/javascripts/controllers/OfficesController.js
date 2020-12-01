angular.module('verifier')
  .controller('OfficesController',['$scope', '$http', '$window', 'Auth', function($scope, $http, $window, Auth){
	$scope.diets = [];

	$http.get("/offices.json").then(function(response){
		$scope.offices = response.data;
		console.log($scope.offices);
	},function(response){
		alert("There was a problem: " + response.status);
	});

	 Auth.currentUser().then(function(user) {
	 	// body...

	 	if (user) {
	 		
	 		// if(user.roles.some(role => role.name === "admin")){
				
				// ng-disabled = false;
    //           }
			$scope.WaecOfficeId = user.office_id;
		
		} else {
			$scope.WaecOfficeId = 0;
		
		}

	 })



		var officeSelected = $scope.WaecOfficeId;

		console.log(officeSelected);
		

		$scope.$watch('WaecOfficeId', function(newValue, oldValue){
		window.sessionStorage.setItem('officeID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})

	//console.log(dietSelected);
}]);
