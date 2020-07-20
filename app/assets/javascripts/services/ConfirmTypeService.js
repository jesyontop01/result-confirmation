angular.module('verifier').factory('ConfirmTypeService', ['$http','$q',function($http, $q){

	var fac = {};

		fac.AllConfirmTypes = function(){

		    return $http.post("/confirm_types.json");
		
                };


	return fac;

}]);