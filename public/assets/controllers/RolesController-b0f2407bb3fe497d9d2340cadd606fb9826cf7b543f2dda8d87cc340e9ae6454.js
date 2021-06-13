angular.module('RolesCtrl', [])
  .controller('RolesController',['$scope', '$http', '$window', 'Auth', 'Role', function($scope, $http, $window, Auth, Role){
	$scope.roles  = [];

	//$http.get("/roles.json")
	    			Role.getRoles().then(function(response){
		$scope.roles = response.data;
		console.log($scope.roles);
	},function(response){
		alert("There was a problem: " + response.status);
	});

	 Auth.currentUser().then(function(user) {
	 	// body...

	 	if (user) {
			$scope.RoleId = user.roles.id;
		
		} else {
			$scope.RoleId = 0;
		
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
