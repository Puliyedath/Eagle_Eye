(function(){
    var app = angular.module('sfMovieApp', ['ngRoute', 'd3']);
    app.config(['$routeProvider', function($routeProvider){

	    $routeProvider
		.when("/showBarChart",{
		    templateUrl: "/d3/partials/barchart.html"
		})
	    .otherwise({redirectTo: "/"});
    }]);
}());

