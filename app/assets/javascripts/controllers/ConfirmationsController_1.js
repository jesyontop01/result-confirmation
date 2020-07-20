angular.module('verifier')
.controller('ConfirmationsController',['$scope', '$http', '$window', function($scope, $http, $window){

	$scope.confirms = [];

		    	$scope.getAllConfirmation = function(){

		    		$http({
		    		method: 'GET',
		    		url: '/confirmations.json',
					}).then(function(response){

						   debugger;
					    		$scope.confirms = response.data;
					    		console.log($scope.confirms);
					  
						    		
					    	}, function(response){
					    		alert("There was an Error:");
					    	});
				    	};

				    	
								  	
									

    	$scope.getAllConfirmation();
}]);