angular
.module('verifier')
.controller('AuthCtrl', function ($scope, $rootScope, Auth, $location) {
	// body...
	 var config = {
            headers: {
                'X-HTTP-Method-Override': 'POST'
            }
        };


    $scope.register = function(){
      Auth.register($scope.user, config).then(function(user){
        $rootScope.user = user
        alert("Thanks for signing up, " + user.username);
        $location.path('/');
        //$state.go('home');
      }, function(response){
        alert(response.data.error)
      });
    };

    $scope.login = function(){
      Auth.login($scope.user, config).then(function(user){
        $rootScope.user = user
        alert("You're all signed in, " + user.username);
        $location.path('/');
        //$state.go('home');
      }, function(response){
        alert(response.data.error)
      });
    };

} );


