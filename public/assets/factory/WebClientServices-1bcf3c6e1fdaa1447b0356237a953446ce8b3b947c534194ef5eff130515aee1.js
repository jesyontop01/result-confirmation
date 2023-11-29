angular.module('WebClientServices', [])
.factory('WebClient', function ($http) {
	// body...
	
	webClientFactory = {};

	webClientFactory.getWebServices = function () {
		// body...
		return $http.get("/web_services.json");
	}

	webClientFactory.getWebServicesById = function (id) {
		// body...
		return $http.get("/web_services/"+id+"/get_WebServices_By_ServiceType.json");
	}

	webClientFactory.getOneWebServices = function (id) {
		// body...
		return $http.get("/web_services/"+id+".json");
	}

	webClientFactory.getAppServiceTypes = function () {
		// body...
		return $http.get("/app_service_types.json");
	}

	webClientFactory.getOneAppServiceType = function (id) {
		// body...
		return $http.get("/app_service_types/"+id+".json");
	}

return webClientFactory;
	

})
;
