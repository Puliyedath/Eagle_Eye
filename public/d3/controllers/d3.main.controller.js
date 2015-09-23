(function(){
    angular.module('sfMovieApp')
	.controller('d3Ctrl', ['$scope', 'dataCollector', '$timeout',function($scope, dataCollector, $timeout){
	    $scope.title = "Histogram: Year vs Number of Movie Shootings";
	    $scope.d3Data = [];
	    var releaseYearData = [
		    {year: "2000", score : 0},
		    {year: "2005", score : 0},
		    {year: "2010", score : 0},
		    {year: "2013", score : 0},
		    {year: "2014", score : 0},
		    {year: "2015", score : 0}
	    ];

	    dataCollector.getAllMovies(function(locations){
	    	$timeout(angular.forEach(locations, function(location){
	    	    [0,1,2,3,4,5].some(function(i){
	    		if (location.release_year === releaseYearData[i].year){
	    		    releaseYearData[i].score = releaseYearData[i].score + 1 ;
	    		    return true;
	    		}
	    		return false;
	    	    });
	    
	    	}),0).then(function(){
	    	    $scope.d3Data = releaseYearData;
	    	});
	    });

	}]);
    
})();
