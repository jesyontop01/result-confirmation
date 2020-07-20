angular.module('verifier')
.controller('DocPrinterController',["$scope", "$http", "$routeParams",'$window','ConfirmationService', '$location',
										function($scope, $http, $routeParams, $window , ConfirmationService, $location){

										}]);


angular.module('verifier')
.factory('SubjectCode',['$http',function($http){
	urlBase = "/exams.json";
		subjectCode = {}

		SubjectCode.getSubjectName = function(year){
			return	$http.get(urlBase +'/' + year);

		}


		return	subjectCode	;
}]);