'use strict';

cs142App.controller('UserListController', ['$scope','$resource','$location',
    function ($scope, $resource, $location) {
    
    
       
        var users = $resource('/user/list',{},{'method':'get', isArray:true});
        
        var data = users.query(function(d){
            $scope.main.userListModel = d;
            console.log('userList:',$scope.main.userListModel)
            $scope.$apply();
        });
       
           
            

       
    }]);

