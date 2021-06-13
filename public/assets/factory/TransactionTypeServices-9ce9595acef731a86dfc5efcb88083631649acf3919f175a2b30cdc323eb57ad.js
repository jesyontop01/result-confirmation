angular.module('TransactionTypeServices', [])
.factory('TransType', function ($http) {
  // body...
  
 transFactory = {};

  transFactory.getTransactionTypes = function () {
    // body...
    return $http.get("/transaction_types.json");
  }

return transFactory;
  

});
