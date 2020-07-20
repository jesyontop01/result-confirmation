angular.module('verifier')
	.service('crudService',['$http', function($http) {
		// body...
		let baseURL = "";
		this.getOneRecord = function(baseURL, id){
			// body...
			return $http.get("baseURL/"+id+".json");
		};

		this.getAllRecords = function(baseURL){
			// body...
			return $http.get("baseURL.json");
		};

		this.updateOneRecord = function(baseURL, tbl_record){
			// body...
			 return $http({  
                method: "put",  
                url: "baseURL/id.json",  
                data: JSON.stringify(tbl_record),  
                dataType: "json"  
            });  
		};

		this.deleteStudent = function(Id) {  
        return $http.post('Student/DeleteStudent/' + Id)  
    };

	}])