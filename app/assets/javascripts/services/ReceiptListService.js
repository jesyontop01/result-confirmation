angular.module('verifier')
       .service('ReceiptListService', function() {
  this.userData = {};

  this.setReceiptStatus = function(list) {
        this.userData.list = list;
  };

  this.getReceiptStatus = function() {
        return this.userData.list;
  };

  this.setYear = function(year) {
        this.userData.year = year;
  };

  this.getYear = function() {
        return this.userData.year;
  };

});