(function(){
    'use strict';
    function mapsInitFactory($window, $q) {
	var asyncUrl = 'https://maps.googleapis.com/maps/api/js?callback=',
	    mapsDefer = $q.defer();

	$window.googleMapsInitialized = mapsDefer.resolve;

	//Async loader
	var asyncLoad = function(asyncUrl, callbackName) {
	    var script = document.createElement('script');
	    script.src = asyncUrl + callbackName;
	    document.body.appendChild(script);
	};

	//loading google maps
	asyncLoad(asyncUrl, 'googleMapsInitialized');

	// object: Initializer.mapsInitialized.then(callback)
	return {
	    mapsInitialized: mapsDefer.promise
	};
    }

    angular.module('sfMovieApp')
	.factory('mapsInit',mapsInitFactory)
	.directive("movieMap", ['$q', 'mapsInit',function($q,mapsInit){
	    return {
		restrict: 'AE',
		replace: true,
		template: "<div id='map' class='container'></div>",
		scope:{
		    zoom: "=",
		    streets: "="
		},
		link: function($scope){
		    var geocoder, latlng, map,
			markers=[];
		    var initialize = function(){
			latlng = new google.maps.LatLng(37.775, -122.419);
			var options = {
			    zoom: $scope.zoom,
			    center: latlng,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			map = new google.maps.Map(document.getElementById('map'), options);
			return map;

		    };

		    var addStreetMarkers = function(map, markers){
			var geocodedMap = $q.defer();
			geocoder = new google.maps.Geocoder();

			//clearing off the markers
			angular.forEach(markers, function(marker){
			    marker.setMap(null);
			});

			if(!$scope.streets){
			    return;
			}


			//setting the markers and infowindow for each of the location passed to the directive
			angular.forEach($scope.streets, function(street){
			    console.log(street.locations);
			    geocoder.geocode({'address': street.locations + "SF, CA"},function(resultMarkers, status){

				if(status === google.maps.GeocoderStatus.OK){
				    map.setCenter(resultMarkers[0].geometry.location);

				    var infoWindow = new google.maps.InfoWindow({
					content: street.title + "(" + street.locations + ")",
					map: map
				    });

				    var marker = new google.maps.Marker({
					map: map,
					position: resultMarkers[0].geometry.location
				    });

				    //pops start showing up on the map if you dont call this here
				    infoWindow.close();

				    google.maps.event.addListener(marker, 'mouseover', function() {
					infoWindow.open(map, marker);
				    });

				    google.maps.event.addListener(marker, 'mouseout', function() {
					infoWindow.close();
				    });

				    markers.push(marker);
				}
			    });
			});
		    };


		    mapsInit.mapsInitialized.then(function(){
			map = initialize();
			$scope.$watch("streets",function(newValue, oldValue){
			    addStreetMarkers(map, markers);
			});
		    });
		}

	    };
	}]);
})();
