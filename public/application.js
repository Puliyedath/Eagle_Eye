(function(){
    var app = angular.module('sfMovieApp', ['ngRoute', 'd3']);
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

	    $routeProvider
		.when("/showBarChart",{
		    templateUrl: "/d3/partials/barchart.html"
		})
		.when("/showLineChart", {
		    templateUrl: "/d3/partials/linechart.html"
		}).
		otherwise({redirectTo: "/persons"});
    }]);
}());
