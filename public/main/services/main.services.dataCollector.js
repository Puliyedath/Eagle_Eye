(function(){
    angular.module('sfMovieApp')
	.service('dataCollector', ['$http', '$q', function($http, $q){
	    this.lastQuery = "";

	    this.getSubmittedMovies = function(queryString, callback){
		if (this.lastQuery === queryString){
		    console.log('no change in the query , no need to run');
		    return;
		}
		this.lastQuery = queryString;
		this.getMovies(queryString,callback);
	    };

	    this.getMovies = function(queryString,callback){
		$http.get('/sResults', {params: {queryString: queryString}})
		    .success(function(data){
			if (!data.error){
			    callback(data);
			}
		    });
	    };

	    this.getAllMovies = function(callback){
		$http.get('/all')
		    .success(function(data){
			if (!data.error){
			    callback(data);
			}
		    });
	    };

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
