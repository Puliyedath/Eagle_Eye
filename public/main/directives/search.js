(function(){
    angular.module('sfMovieApp')
	.directive('movieSearch', function(){
	    return{
		restrict: 'E',
		replace: true,
		templateUrl:"/d3/partials/autocomplete.html",
		link: function(scope, elem, attrs){

		    //attaching the event listeninger to the ul 
		    elem.bind("keydown keypress", function (event){
		    });

		    scope.select = function(location){
			scope.visible = false;
			var output = [];
			output.push(location);
			scope.submit(output, true);
		    };

		}
	    };
	});
}());
