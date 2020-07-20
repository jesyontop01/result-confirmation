angular.module('verifier')
.controller("VerifiersController",['$scope', '$http', '$location', '$window', 'Auth',
							function($scope,$http, $location, $window, Auth){

       	//search(keywords, ExamDietId, ExamYearId)

	Auth.currentUser().then(function(user) {           // User was logged in, or Devise returned
            // previously authenticated session.
            console.log('user :'+ user); // => {id: 1, ect: '...'}
        }, function(error) {
            // unauthenticated error
        });


        console.log(Auth._currentUser); // => null

        // Log in user...

        console.log(Auth._currentUser); // => {id: 1, ect: '...'}

		

		var page = 0;

		$scope.results = [];
		let idYear;
		let idDiet ;
	$scope.search = function(searchTerm, yearId , dietId){ 
		if (searchTerm.length < 10){
			return;
		}

		 idYear = $window.sessionStorage.getItem('yearID');

    	console.log(idYear);

  		 idDiet = $window.sessionStorage.getItem('examID');

   	    console.log(idDiet);


		$http.get("/exams.json", 
				   {"params": { "CandNo": searchTerm, "yearId": idYear, "dietId": idDiet}}
			).then(function(response){ 
				
				//$scope.results = response.data;

				if (response.data.length == 0){
					alert("Candidate result is not available !");
				}
				else
					$scope.results = response.data;

				console.log(response.data);
				//console.log(response.status);
			}
			, function(response){ 
				alert("There was a problem: " + response.status); 
			});
		}

	$scope.previousPage = function(){
				if (page > 0){
					page = page - 1;
					$scope.search($scope.keywords);
				}
		}

	$scope.nextPage = function(){
				page = page + 1;
				$scope.search($scope.keywords);
		}

		$scope.viewDetails = function(result){
			$location.path("/" + result.CandNo );
		}

		$scope.getConfirmations = function() {
			// body...
			$location.path('/confirmations');
		}
	

	
	}
]);