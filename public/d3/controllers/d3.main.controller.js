(function(){
    angular.module('sfMovieApp')
	.controller('d3Ctrl', ['$scope', 'dataCollector', '$timeout',function($scope, dataCollector, $timeout){
	    $scope.controller = "Window resizes when we shrink it";
	    $scope.year = 78;
	    $scope.d3Data = [];
	    $scope.actorShootingData = {};
	    console.log('inside d3');

	    dataCollector.getAllMovies(function(locations){
		var releaseYearData = [
		    {year: "1995", score : 0},
		    {year: "2000", score : 0},
		    {year: "2005", score : 0},
		    {year: "2010", score : 0},
		    {year: "2015", score : 0}
		];
		
		$timeout(angular.forEach(locations, function(location){
		    console.log(location);
		    [0,1,2,3].map(function(i){
			if (location.release_year < releaseYearData[i].year){
			    releaseYearData[i].score = releaseYearData[i].score+ 1 ;
			}
		    });

		}),1000).then(function(){
		    $scope.d3Data = releaseYearData;
		    console.log($scope.d3Data);
		});
	    });

	}]);
})();
