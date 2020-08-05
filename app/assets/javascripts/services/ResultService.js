angular.module('verifier').factory('ResultService', ['$http','$q',function($http, $q){

	var fac = {};

		// fac.AddConfirmationToDB = function(candidate){

		// return $http.post("/confirmations.json", candidate);
		
  //               };


		// fac.ResultDetailsFromDB = function(id){
		// 	return	$http.get("/confirmations.json", {params:{id: id}});
		//};

		fac.ResultDetailsFromDB = function(examno, examyear,examdiet){

			return $http.get("/exams.json", 
				   {"params": { "CandNo": examno, "YearName": examyear, "DietName": examdiet}}
			);
		

		};

		fac.ResultDetailsWithIDs = function(examno, examyear,examdiet){

			return $http.get("/exams.json", 
				   {"params": { "CandNo": examno, "yearId": examyear, "dietId": examdiet}}
			);
		

		};

		// fac.UpdateConfirmationToDB = function(id){


		// };


	return fac;

}]);