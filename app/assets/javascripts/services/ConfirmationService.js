angular.module('verifier').factory('ConfirmationService', ['$http','$q',function($http, $q){

	var fac = {};

		fac.AddConfirmationToDB = function(candidate){

			

		return $http.post("/confirmations.json", candidate);
		
                };


		fac.ConfirmationDetailsFromDB = function(id){
			return	$http.get("/confirmations.json", {params:{id: id}});

		};

		fac.UpdateConfirmationToDB = function(id){


		};


	return fac;

}]);