'use strict';
// cs142App.directive('fileModel', ['$parse', function ($parse) {
//   return {
//      restrict: 'A',
//      link: function(scope, element, attrs) {
//         var model = $parse(attrs.fileModel);
//         var modelSetter = model.assign;
//         element.bind('change', function(){
//            scope.$apply(function(){
//               modelSetter(scope, element[0].files[0]);
//            });
//         });
//      }
//   };
// }]);
// cs142App.service('fileUpload', ['$http', function ($http) {
//   this.uploadFileToUrl = function(file, uploadUrl){
//      var fd = new FormData();
//      fd.append('file', file);
//      $http.post(uploadUrl, fd, {
//         transformRequest: angular.identity,
//         headers: {'Content-Type': undefined}
//      })
//      .then(function(){
//      })
//      .then(function(){
//      });
//   }
// }]);
cs142App.controller('UploadFileController', ['$scope', function($scope, fileUpload){
  $scope.file = {};
  $scope.uploadFile = function(){
     var file = $scope.file.myFile;
     console.log(file);
     var uploadUrl = "/photos/new";
    //  fileUpload.uploadFileToUrl(file, uploadUrl);
  };
}]);



 

 
  