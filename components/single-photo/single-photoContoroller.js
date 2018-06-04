'use strict';

cs142App.controller('SinglePhotoController', ['$scope', '$routeParams','$resource','$location',
  function ($scope, $routeParams,$resource,$location) {

    var sphoto_id = $routeParams.photo_id;
    console.log('photo_id is ', sphoto_id);
    //
    var singlePhoto = $resource('/singlephoto/:photo_id')
    singlePhoto.get({photo_id:sphoto_id},function(singlePhotoInstance){
      $scope.main.singlePhotoInstance = singlePhotoInstance
      console.log($scope.main.singlePhotoInstance)
      })
      $scope.addComment = function(){
      
        var img_id = this.x._id;
        console.log($scope.addComment.img_id);
        console.log('loggedUser:',$scope.main.loggedUser);
        $scope.addComment.photoResource=this.x;
        //
        $scope.addComment.newLine = {
          date_time:Date(),
          comment:$scope.addComment.newComment
        };
        $scope.addComment.existingComment = this.x.comments;
        // figure out last name of logged in user
        var loggedInDetails = $resource('/user/list');
       
         loggedInDetails.query(function(result){
           result.forEach(function(el){
             if (el.first_name.toLowerCase() === $scope.main.loggedUser.toLowerCase()){
               console.log('we have a match');
               var user = {
                  user_id:el._id,
                  first_name:el.first_name,
                  last_name:el.last_name
               };
               console.log('user: ',user);
               console.log('exisitngComments before: ',$scope.addComment.existingComment);
               $scope.addComment.newLine.user = user;
               
               console.log('newComment: ',$scope.addComment.newLine);
               $scope.addComment.existingComment.push($scope.addComment.newLine);
               
               console.log('exisitngComments after: ',$scope.addComment.existingComment);
               //pack it in.
               console.log("photo_id: ",img_id);
               console.log('updated comment array: ',$scope.addComment.existingComment);
              // make the update
               var photoToCommentOn = $resource('/commentsOfPhoto/:photo_id');
               photoToCommentOn.save({photo_id:img_id},{comments:$scope.addComment.existingComment}, function (comment){
                 console.log(comment);
                 $location.path($location.path());
                 $scope.addComment.newComment = '';
               });
  
               return;
             } else {
               console.log('we have an error');
               $location.path($location.path());
               $scope.addComment.newComment = '';
               return;
             }
           });
         });
      
      
  
        
      }; 
    
   
    // $scope.main.uId = userId;
    // $scope.main.context = 'now scoping: ';
    // //
    // var userById = $resource('/user/:_id',{_id:'@id'},{action:{method:'get'}});
    // userById.get({_id:userId},function(usersDetails){
    //   console.log(usersDetails)
      
    //     $scope.main.usersModel = usersDetails;
    // });



  }])