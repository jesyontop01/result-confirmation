angular.module('verifier')
  .controller('DivisionsController',['$scope', '$http', '$window', 'Auth', function($scope, $http, $window, Auth){
	$scope.diets = [];

	$http.get("/divisions.json").then(function(response){
		$scope.divisions = response.data;
		console.log($scope.divisions);
	},function(response){
		alert("There was a problem: " + response.status);
	});

	$scope.WaecDivisionId = 0;


 $scope.finDepts = [];
   $scope.getFinDept = function () {
     var divisionId = $scope.WaecDivisionId;
     if (divisionId == 2) {
          $http.get("/finance_depts.json", 
           {"params": { "division_id": divisionId}}
          ).then(function(response){ 
      debugger
            $scope.finDepts = response.data;
                 console.log(response);
             },function (response) {
                 alert('Unexpected Error');
             });
     }
     else {
         $scope.finDepts = null;
     }
 }


	 Auth.currentUser().then(function(user) {
	 	// body...

	 // 	if (user) {
	 		
	 // 		// if(user.roles.some(role => role.name === "admin")){
				
		// 		// ng-disabled = false;
  //   //           }
		// 	$scope.WaecDivisionId = user.office_id;
		
		// } else {
		// 	$scope.WaecDivisionId = 0;
		
		// }

	 })



		var divisionSelected = $scope.WaecDivisionId;

		console.log(divisionSelected);
		

		$scope.$watch('WaecDivisionId', function(newValue, oldValue){
		window.sessionStorage.setItem('divisionID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})

	//console.log(dietSelected);
}]);
