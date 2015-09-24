(function(){
    angular.module('sfMovieApp')
	.controller('d3Ctrl', ['$scope', 'dataCollector', '$timeout',function($scope, dataCollector, $timeout){
	    $scope.title = "Histogram: Year vs Number of Movie Shootings";
	    $scope.d3Data = [];

	    function created3Data(data){
		var releaseYearData = [];
		var length = data.length - 1;

		//generating random values between 1941 and 2015 and populating the array for the d3Charts
		[0,1,2,3,4,5].map(function(i){
		    releaseYearData[i] = data[Math.floor(Math.random() * length) + 1] || 0 ;
		});


		if(releaseYearData[0]){
		    return releaseYearData;
		}else{
		    console.log("data parsing failed on the client side");
		    return releaseYearData;
		}

	    }

	    //data collector service makes an aggregate query to the back end and returns a promies
	    dataCollector.getStats().then(function(data){
		$scope.d3Data =	created3Data(data);
		console.log($scope.d3Data);
	    }, function(data){
		console.log("promise failed no  data retrieved");
		$scope.d3Data = [];
	    });

	}]);
    
})();
