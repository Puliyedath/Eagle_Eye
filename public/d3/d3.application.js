(function(){
    angular.module('d3', [])
	.factory('d3Service', ['$document', '$q', '$rootScope', function($document, $q, $rootScope){
	    var defer = $q.defer();

	    function onScriptLoad(){
		$rootScope.$apply(function(){
		    //this will resolve the promise with d3 object and make it avaibable in the callback
		    defer.resolve(window.d3);
		});
	    }

	    //loading the d3 script tag into the client browser
	    var scriptTag = $document[0].createElement('script');
	    scriptTag.type = 'text/javascript';
	    scriptTag.async = true;
	    scriptTag.src="http://d3js.org/d3.v3.min.js";
	    scriptTag.onreadystatechange = function(){
		if (this.readyState == 'complete'){
		    onScriptLoad();
		}
	    };
	    scriptTag.onload = onScriptLoad;

	    //attaches the script tag to the document body
	    $document[0].getElementsByTagName('body')[0].appendChild(scriptTag);

	    return {
		d3Promise: defer.promise
	    };
	    
	}]);
    
})();
