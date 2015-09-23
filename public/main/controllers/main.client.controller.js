(function(){
    angular.module('sfMovieApp')
	.controller('mainCtrl',['$scope','$http','dataCollector', function($scope, $http, dataCollector){
	    $scope.locations=""; //this is old code dont delete it
	    $scope.visible = false;
	    $scope.subMLocations = "";

        dataCollector.getAllMovies(function(data){
		    $scope.locations = data;
            $scope.subMLocations = data;
		    console.log(data);
		});

	    //send a get request for every change in text
	    $scope.$watch('text',function(newValue, oldValue){
		if(!($scope.text)){
		    $scope.visible = false;
		}
		
		if(oldValue === newValue){
		    return;
		}
		
		dataCollector.getMovies($scope.text,function(data){
		    $scope.locations = data;
		    $scope.visible = true;
		    console.log(data);
		});
	    });
	    
	    $scope.submit = function(selectedEntry, goToGoogleMaps){
		if(goToGoogleMaps){
		    $scope.subMLocations = selectedEntry;
		    $scope.text = selectedEntry[0].title + "-" + selectedEntry[0].locations;
		}
		
        dataCollector.getSubmittedMovies(selectedEntry,function(movies){
		    $scope.subMLocations = movies;
		});

		$scope.visible = false;
	    };
	}]);
}());
