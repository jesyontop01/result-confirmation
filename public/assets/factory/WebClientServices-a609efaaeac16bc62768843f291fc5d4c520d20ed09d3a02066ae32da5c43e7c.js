angular.module('WebClientServices', [])
.factory('WebClient', function ($http) {
	// body...
	
	webClientFactory = {};

	webClientFactory.getWebServices = function () {
		// body...
		return $http.get("/web_services.json");
	}

	webClientFactory.getOneWebServices = function (id) {
		// body...
		return $http.get("/web_services/"+id+".json");
	}

return webClientFactory;
	

})
;
