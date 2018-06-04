'use strict';

var cs142App = angular.module('cs142App', ['ngRoute','ngFileUpload','ngMaterial','ngResource']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/users', {
                templateUrl: 'components/user-list/user-listTemplate.html',
                controller: 'UserListController'
            }).
            when('/users/:userId', {
                templateUrl: 'components/user-detail/user-detailTemplate.html',
                controller: 'UserDetailController',
                
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/photos/:userId', {
                templateUrl: 'components/user-photos/user-photosTemplate.html',
                controller: 'UserPhotosController'
            }).
            when('/admin/login', {
                templateUrl: 'components/login-register/login-registerTemplate.html',
                controller: 'LoginRegisterController'
            }).
            when('/singlephoto/:photo_id', {
                templateUrl: 'components/single-photo/single-photoTempate.html',
                controller: 'SinglePhotoController'
            }).
 	         otherwise({
                redirectTo: '/users'
            });
    }]);
    // broadcasting

cs142App.controller('MainController', ['$scope','$resource','$location','$http',
    function ($scope, $resource,$location,$http) {
        $scope.main = {};
        $scope.main.title = 'Users';
        $scope.main.show = true;
        $location.path('/admin/login');
        var info = $resource('test/info',{},{action:{method:'GET'}});
        // var data = info.get().$promise.then(function(d, $scope ){
        //      console.log(d.__v)
        //      $scope.main.version = d.__v
        // })
        var data = info.get(function(d){
            console.log(d); // logs the data nicely
            $scope.main.version = d; // does not update 
        });
        console.log($scope.main.version); // return undefined?!
        // logout the user ie destroy the session
        
        $scope.logout = function (){
            console.log('trying to logout');
            var logout = $resource('/admin/logout');
            console.log('coming back from resource');
            logout.save(function(err){
                console.log('inside save');
                if (!err){
                    console.log('killing the session');
                    console.log(err);
                    $scope.main.loggedUser = null;
                    console.log('loggedUser:',$scope.main.loggeUser);
                    console.log('$location:');
                    $location.path('/admin/login');
                    console.log($location.path());
                    $scope.main.logoutError = err;
                } else {
                    console.log('cannot reach session');
                    console.log(err);
                    $scope.main.loggedUser = null;
                    $location.path('/admin/login');
                    console.log($location.path());
                    $scope.main.logoutError = err;

                }
               
             
         }, function erroHandler(err){
             console.log('trouble');
             $scope.main.logoutError = err;
             
         });
  
         };
         //
       
         // figure out if anyone is logged in
        $scope.whoLoggedIn = function(){
            // console.log($scope.main.loggeUser)
            if ($scope.main.loggedUser === '' || typeof ($scope.main.loggedUser) === 'undefined' || $scope.main.loggedUser === 'undefined' || $scope.main.loggedUser === null){
                $location.path('/admin/login');

                return false;
            } else {
                return true;
            }
        };
      
        
        var selectedPhotoFile;   // Holds the last file selected by the user

        // Called on file selection - we simply save a reference to the file in selectedPhotoFile
        $scope.inputFileNameChanged = function (element) {
            selectedPhotoFile = element.files[0];
            
        };
        
        // Has the user selected a file?
        $scope.inputFileNameSelected = function () {
            return !!selectedPhotoFile;
        };
        
        // Upload the photo file selected by the user using a post request to the URL /photos/new
        var url = '/photos/new'
        $scope.uploadPhoto = function () {
            if (!$scope.inputFileNameSelected()) {
                console.error("uploadPhoto called will no selected file");
                return;
            }
            console.log('fileSubmitted', selectedPhotoFile); // correct output
           var domForm = new FormData()
           domForm.append('uploadedphoto',selectedPhotoFile)
           /// NOT WORKING
           console.log('domform:',domForm.get('uploadedPhoto')) // making sure we got the data.
           var filePost = $resource('/photos/new',{})
           filePost.save({file:selectedPhotoFile},function(hope){
               console.log(hope)
           }) 
        
        //    Using XMLHttpRequest instead of $http
        // NOT WORKING, still getting undefined for file
            // var xhr = new XMLHttpRequest
            // xhr.open("POST", '/photos/new/', true) // the URL and an asynchronous function set to true
            // // xhr.setRequestHeader("Content-type", "Application/json")
            // xhr.withCredentials = true;  // headers are set automatocally
            // xhr.onreadystatechange = function() {//Call a function when the state changes.
            //     if(this.readyState ==4 && this.status == 200) {
            //         $scope.data = JSON.parse(this.responseText);
            //         $scope.$apply(function(){
            //             $scope.main.fileDetails = $scope.data // this is where update happens
            //         })
            //     }
            // }
            // data = JSON.stringify({uploadedPhoto:selectedPhotoFile})
            // xhr.send(domForm) // headers are set automatocally
            
           
        };
        
    }]);
