    angular.module('verifier')
    .factory('myAppFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    url: '/payments.json'
                });
            }
        }
    });
