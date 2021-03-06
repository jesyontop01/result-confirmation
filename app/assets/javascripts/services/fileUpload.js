angular.module('verifier')
    .service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, ref_no ){
        let token = window.sessionStorage.getItem('token');
        var fd = new FormData();
        fd.append('file', file);
        $http.put(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                    Authorization :`Bearer ${token.replace("\"", "")}`, 
                    'Content-Type': undefined
                },
            params: ref_no,
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);


    // let token = window.sessionStorage.getItem('token');

    //     $http({
    //         method: 'PUT',
    //         url: "http://localhost:5000/applicants/"+$scope.wesApplicantID+".json",
    //         data : $scope.BlobPdfFile,
    //         transformRequest: angular.identity,  
    //         headers: {
    //                 Authorization :`Bearer ${token.replace("\"", "")}`, 
    //                 'Content-Type': undefined
    //             },
    //         params: $scope.wesApplicant.ref_no,
    //         pdfFile: angular.toJson(fd)
    //                                             })