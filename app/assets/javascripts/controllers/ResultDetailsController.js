angular.module('verifier')
.controller("ResultDetailsController", [
	"$scope", "$http", "$routeParams",'$window','$location',
		function($scope, $http, $routeParams, $window, $location){		

		let idYear = $window.sessionStorage.getItem('yearID');

    	console.log(idYear);

  		let idDiet = $window.sessionStorage.getItem('examID');

   	    console.log(idDiet);

		var resultExam_no = $routeParams.exam_no;
		

		$scope.result = [] ;
		$http.get("/exams.json", 
				   {"params": { "CandNo": resultExam_no, "yearId": idYear, "dietId": idDiet}}
			).then(function(response){
				//console.log(response.data[0]);
				//exit;
				$scope.result = response.data[0];

				//console.log($scope.result);
				console.log(response.data);
				//alert("Its a success " + response.status);
			},function(response){
				alert("There was a problem " + response.status);
			   }
			);	

			$scope.loadAddress = function(result){
			$location.path("/" + result.ExamDiet +" /"+ result.ExamYear + "/" + result.CandNo);  
		}
		
		}
	]);
