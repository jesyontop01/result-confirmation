    angular.module('verifier')
    .factory('myAppFactory', function ($http) {
        return {
            getData: function () {
                return $http({
                    method: 'GET',
                    url: '/payments.json'
                });
            }

            // getFilteredData: function(officeID, startDate, endDate) {
            //     return $http({
            //         method: 'GET',
            //         url: '/payments.json',
            //          params: {
            //                 WaecOfficeId : officeID,
            //                 dateFrom: startDate,
            //                 dateTo: endDate
            //             }
            //     });
            // }
        }
    });
