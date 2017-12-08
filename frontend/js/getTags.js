var users = '';

var app = angular.module('myInstagram', ['angularUtils.directives.dirPagination']);
app.controller('myCtrl',function($scope, $http){    // set the default search/filter term
  	
  	$scope.perPage = 3;
    $scope.currentPage = 1;    

    $scope.pageChanged = function(newPage){
      var totalPageCount = parseInt($scope.images.length / $scope.perPage);      
      if(newPage>0 && newPage <= totalPageCount){
        $scope.currentPage = newPage;
      }
    }

  	$scope.getTags= function(){
		axios.post('/searchTag', {
	    	tag: $('#tag').val()
	  	})
	  	.then(function (response) {
	  		console.log(response)
	  
	  		$scope.users = response.data[0].users_in_photo;
	  		console.log(response.data[0].users_in_photo)
	  		var images = [];
	  		var temp = {};

	  		for(var i=0; i<response.data[0].users_in_photo.length; i++){
	  			temp = {};
	  			temp['name']=response.data[0].users_in_photo[i].user.full_name;
	  			temp['profile']=response.data[0].users_in_photo[i].user.profile_picture;
	  			images.push(temp);
	  		}
		    $scope.images = images;
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	})
	}
    
})