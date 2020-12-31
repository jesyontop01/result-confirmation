
angular.module('verifier')
    .factory('ReceiptListService', ['$http', '$q', function($http, $q){
      // body...
     
      // body...
        var fac = {};

        fac.GetTopReceipt = function(){

          return $http.get('/receipt_statuses.json');  
        
        };


        fac.ReceiptID = function(receipt_no){
          
          return $http.get('/receipt_statuses.json', 
              {"params": { "receiptNo": receipt_no}})
          .then(function(resp) {
            // body...
            resp.data.id;
          });

        };

        fac.getReceiptBooklet = function () {
          // body...
          return $http.get('/receipt_booklets.json');  
        };

        fac.UpdateConfirmationToDB = function(id){


        };


      return fac;
    }])