angular.module('WebServicesController', [])
  .controller('WebServicesCtrl',['$scope', '$http', '$window', 'WebClient', function($scope, $http, $window,WebClient){

  	var vm = this;
	$scope.webClientURL  = [];

	WebClient.getWebServices().then(function(response){
		$scope.webClients  = response.data.data;
		console.log($scope.webClients );
	},function(response){
		alert("There was a problem: " + response.status);
	});



		clientSelected = $scope.webClientURL;

		console.log($scope.webClientURL);

		

		$scope.$watch('webClientURL.id', function(newValue, oldValue){
		window.sessionStorage.setItem('clientID', newValue);
		//window.localStorage.setItem('currentMData', newValue);
	})

	//console.log(dietSelected);
}]);