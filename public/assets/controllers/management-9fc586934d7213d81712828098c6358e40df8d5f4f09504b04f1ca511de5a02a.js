
angular.module('managementController', ['userServices'])
.controller('managementCtrl',['User', function(User) {
	// body...
vm = this;
	console.log('testing management routes');
vm.loading = false;
vm.accessdenied = true;
vm.errorMsg = false;
vm.successMsg = false;
vm.editAccess = false;
vm.deleteAccess = false;

this.getAllUsers = function(){
	vm.loading = true;
	User.getUsers().then(function(response){

		//vm.users = response.data.users;
	 debugger
		console.log(response.data);

		var userPermissions = response.data.permission;
        console.log(userPermissions);

		if (response.data.success) {
	for(var i = 0; i < userPermissions.length; i++){
           console.log(userPermissions[i].name);
          
			if(userPermissions[i].name === "admin" || userPermissions[i].name === "is_management" ){
				vm.users = response.data.users;
				vm.loading = false;
				vm.accessdenied = true;
				vm.errorMsg = false;
				vm.successMsg = false;	
				console.log(response.data);
				if (userPermissions[i].name === "admin") {
				vm.editAccess = true;
				vm.deleteAccess = true;

				} else if(userPermissions[i].name === "is_management"){
					vm.editAccess = true;
				} 
			} else {
				vm.errorMsg = "Insufficient Permission";
				vm.loading = false;

			}

		} 
	}
	// 	vm.loading = false;	
	// 	vm.users = response.data.users;
	// 	console.log(response.data);

	// 	var userPermissions = response.data.permission;
 //        console.log(userPermissions);

	// function check(){
 //    var contains = false;
 //        for(var i = 0; i < userPermissions.length; i++){
 //          //console.log(userPermissions[i].name);

 //        //if(next.$$route.permission.includes(userPermissions[i].name)){
 //        if(userPermissions[i].name == "admin" || userPermissions[i].name == "is_management" ){
 //            return true;
 //        }else{
 //            event.preventDefault(); // If not logged in, prevent accessing route
 //            $location.path('/'); // Redirect to home instead
 //      }
 //        }
 //        	event.preventDefault(); // If not logged in, prevent accessing route
 //            $location.path('/'); // Redirect to home instead

 //            return false;
 //        }

 //            console.log(check());
			

		 }, function(response){
			alert("There was an Error:");
	  });
	};

		this.getAllUsers();
}]);


      //          User.getPermission().then(function (response) {
      //           // body...
      //           console.log(response.data);
      //         //debugger
      //           for (var i = 0; i < response.data.length; i++) {
      // if ( response.data[i].name === 'admin' ||  response.data[i].name === 'Management_Staff' ||  response.data[i].name === 'audit_admin') {
      //               vm.authorized = true
      //               vm.loadme = true;

      //             }else{
      //               vm.loadme = true;
      //             }
      //           }
      //         });

