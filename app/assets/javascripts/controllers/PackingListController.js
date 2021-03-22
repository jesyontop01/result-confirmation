angular.module('verifier')
.controller('PackingListController',['$scope', '$http', '$window','$location', '$routeParams'
	,'$rootScope','SweetAlert', 'toaster','fileUpload',
			function($scope, $http, $window, $location, $routeParams, $rootScope,SweetAlert, toaster, fileUpload){

				console.log("This is PackingListController");
				$scope.allPackLists = [];

				$scope.getAllUploadPackLists = function() {
					// body...
					$http.get('/packing_lists.json').then(function(response) {
						// body...
						$scope.allPackLists = response.data.data;

						if (response.success == true) {
							$scope.allPackLists = response.data.data;
							console.log($scope.allPackLists);
						} else {
							console.log(response.data.data);
						}
					})
				}

				var vm = this;
				$scope.file = {};
				//packListUploader(packListUpload)
				$scope.packListUploader = function() {
					// body...
					$scope.waec_office_id =  window.sessionStorage.getItem('stateID');

					$scope.loading = true;
					fileUpload.uploadPackList($scope.file, $scope.waec_office_id)
						.then(function(response) {
						// body...
						if (response.data.success == true) {
							$scope.loading = false;
						console.log(response.data);
							$scope.getAllUploadPackLists();
							$scope.file = {};
				
						} else {
							$scope.loading = false;
							console.log(response.data.data);
						}
					});

					


				}

				$scope.getAllUploadPackLists();
              
        $scope.packListDownload = function(id) {
            // body...
        
            $http.get("/packing_lists/download_file.json",{"params": { "id": id}})
                .then(function(response) {
                    // body...
                   console.log(response);
                   $scope.data = response.data;
                               debugger
                    var file = new Blob([response.data], { type: 'application/zip' });
                    saveAs(file, 'filename.zip');  


                });
        }


        $scope.hf = function () {
            // body...
            $http({
                url: url,
                method: "GET",
                headers: {
                   'Content-type': 'application/json'
                },
              responseType: "arraybuffer"
            }).success(function (data, status, headers, config) {
                console.log(data);
               var file = new Blob([data], { type: 'application/binary' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            var link=document.createElement('a');
            link.href=fileURL;
            link.download="testing.exe";
            link.click();
                window.open(objectUrl);
            }).error(function (data, status, headers, config) {
                //upload failed
            });
        }


	    $scope.fnDownLoad = function () {  
            debugger;  
            $scope.FileExt = $scope.files[0].name.substr($scope.files[0].name.length - 4);  
            $scope.GenerateFileType($scope.FileExt);  
            $scope.RenderFile();  
        }  
  
        $scope.RenderFile = function () {  
            var s = "http://localhost:53154/api/FileUploader/DownLoadFile?"  
               + "FileName=" + $scope.files[0].name  
               + "&fileType=" + $scope.FileType;  
            $window.open(s);  
        }  
  
        $scope.GenerateFileType = function (fileExtension) {  
            switch (fileExtension.toLowerCase()) {  
                case "doc":  
                case "docx":  
                    $scope.FileType = "application/msword";  
                    break;  
                case "xls":  
                case "xlsx":  
                    $scope.FileType = "application/vnd.ms-excel";  
                    break;  
                case "pps":  
                case "ppt":  
                    $scope.FileType = "application/vnd.ms-powerpoint";  
                    break;  
                case "txt":  
                    $scope.FileType = "text/plain";  
                    break;  
                case "rtf":  
                    $scope.FileType = "application/rtf";  
                    break;  
                case "pdf":  
                    $scope.FileType = "application/pdf";  
                    break;  
                case "msg":  
                case "eml":  
                    $scope.FileType = "application/vnd.ms-outlook";  
                    break;  
                case "gif":  
                case "bmp":  
                case "png":  
                case "jpg":  
                    $scope.FileType = "image/JPEG";  
                    break;  
                case "dwg":  
                    $scope.FileType = "application/acad";  
                    break;  
                case "zip":  
                    $scope.FileType = "application/x-zip-compressed";  
                    break;  
                case "rar":  
                    $scope.FileType = "application/x-rar-compressed";  
                    break;  
            }  
        }  
  
        $scope.setFiles = function (element) {  
            $scope.$apply(function (scope) {  
                $scope.AttachStatus = "";  
                $scope.files = []  
                for (var i = 0; i < element.files.length; i++) {  
                    $scope.files.push(element.files[i])  
                }  
                $scope.progressVisible = false  
            });  
        }  
  
    





			}]);