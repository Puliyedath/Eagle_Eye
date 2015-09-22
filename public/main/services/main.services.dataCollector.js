(function(){
    angular.module('sfMovieApp')
	.service('dataCollector', ['$http', function($http){
	    this.lastQuery = "";
	    this.getSubmittedMovies = function(queryString, callback){
		if (this.lastQuery === queryString){
		    console.log('here');
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
	}]);
})();
