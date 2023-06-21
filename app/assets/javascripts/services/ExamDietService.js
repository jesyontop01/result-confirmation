angular.module('verifier')
       .service('ExamDietService', function() {
  this.userData = {};

  this.setDiet = function(diet) {
        this.userData.diet = diet;
  };

  this.getDiet = function() {
        return this.userData.diet;
  };

  this.setYear = function(year) {
        this.userData.year = year;
  };

  this.getYear = function() {
        return this.userData.year;
  };

  this.setYearName = function(yearName) {
      this.userData.yearName = yearName;
};

this.getYearName = function() {
      return this.userData.yearName;
};

});