angular.module('verifier').factory('ResultService', ['$http','$q',function($http, $q){

	var fac = {};

		// fac.AddConfirmationToDB = function(candidate){

		// return $http.post("/confirmations.json", candidate);
		
  //               };


		// fac.ResultDetailsFromDB = function(id){
		// 	return	$http.get("/confirmations.json", {params:{id: id}});
		//};



		// fac.ResultDetailsFromDB = function(examno, examyear,examdiet){

		// 	return $http.get("/exams.json", 
		// 	//return $http.get("/test_results.json",
		// 		   {"params": { "CandNo": examno, "YearName": examyear, "DietName": examdiet}}
		// 	);
		

		// };

		fac.ResultDetailsFromDB = function(examno, examyear,examdiet){

			//return $http.get("/api_results.json",  //$http.get("/exams/getSearchedResultDetails.json",
			return $http.get("/exams/getSearchedResultDetailsForConfirmation.json", 
				   {"params": { "CandNo": examno, "examYear": examyear, "DietName": examdiet}}
			);
		

		};

		fac.ResultDetailsFromDBForConfirmation = function(examno, examyear,examdiet, confirmID, isPrinted){
debugger
			//return $http.get("/api_results.json",  //$http.get("/exams/getSearchedResultDetails.json",
			return $http.get("/exams/getSearchedResultDetailsForConfirmation.json", 
				   {"params": { "CandNo": examno, "examYear": examyear, "DietName": examdiet, "confirmID": confirmID, "isPrinted": isPrinted}}
			);
		

		};


	    fac.ResultDetailsWithIDs = function(examno, examyear,examdiet){

			//return $http.get("/exams.json", 
			return $http.get("/exams.json",
				   {"params": { "CandNo": examno, "yearId": examyear, "dietId": examdiet}}
			);
		

		};


		// fac.ResultDetailsWithIDs = function(examno, examyear,examdiet){

		// 	return $http.get("/exams.json", 
		// 	//return $http.get("/test_results.json",
		// 		   {"params": { "CandNo": examno, "yearId": examyear, "dietId": examdiet}}
		// 	);
		

		// };

		fac.UpdateConfirmationToDB = function(id){

			return $http.get("/confirmations/confirm_IsPrint.json", 
			//return $http.get("/test_results.json",
				   {"params": { "id": id}}
			);
		};


	return fac;

}]);
