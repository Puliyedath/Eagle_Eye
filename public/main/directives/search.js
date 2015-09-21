(function(){
    angular.module('sfMovieApp')
	.directive('movieSearch', function(){
	    return{
		restrict: 'E',
		replace: true,
		template:"<div><input id='search' ng-model='text' placeholder='search for streets'>"+
		    "<ul ng-show=visible class='autocomplete'>" +
		    "<p class='button' ng-click='select(location)' ng-repeat='location in locations | limitTo: 10'><strong>{{location.title}}-{{location.locations}}</strong></p></div>" +
		    "</ul>",
		link: function(scope, elem, attrs){
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
