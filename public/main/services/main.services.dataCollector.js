(function(){
    angular.module('sfMovieApp')
	.service('dataCollector', ['$http', '$q', function($http, $q){
	    this.lastQuery = "";

	    /*
	     caches the last query fired from the search box
	     */
	    this.setLastSubMittedQuery = function(queryString){
		if (this.lastQuery === queryString){
		    console.log('no change in the query , no need to run');
		    return;
		}
		this.lastQuery = queryString;
	    };

	    this.getMovies = function(queryString,callback){
		$http.get('/sResults', {params: {queryString: queryString}})
		    .success(function(data){
			if (!data.error){
			    callback(data);
			}
		    });
	    };

	    /*
	     fires the query to get the stats for release year and number of movie shootings in the city of san fransisco 
	     */
	    this.getStats = function(){
		var defer= $q.defer();
		$http.get('/releaseAndLocations')
		    .success(function(data){
			defer.resolve(data);
		    })
		    .error(function(data, status){
			defer.reject(data);
		    });

		return defer.promise;
	    };
	    
	    
	}]);
})();
