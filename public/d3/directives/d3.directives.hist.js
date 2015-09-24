(function(){
    angular.module('d3')
	.directive('histogram', ['d3Service', '$window',function(d3Service, $window){
	    return{
		restrict: 'EA',
		scope: {
		    data: "="
		},

		link: function(scope, element, attrs){
		    d3Service.d3Promise.then(function(d3){ //d3 - the promise in the service is resolved with the d3 object

			var margin = parseInt(attrs.margin) || 20;
			var barHeight = parseInt(attrs.barHeight) || 30;
			var padding = 5 ;
			
			//appending the svg to the element
			var svg = d3.select(element[0])
				.append('svg')
				.style('width', '100%');


			//browser resize watcher
			window.onresize = function(){
			    scope.$apply();
			};

			//monitoring inner width which is not directly on the scope
			scope.$watch(function(){
			    return angular.element($window)[0].innerWidth;
			}, function(){
			    scope.renderData(scope.data);
			});

			//watch to rerender the svg when the data changes -testing input
			scope.$watch('data', function(newValue, oldValue){
			    return scope.renderData(newValue); 
			},true);

			/*
			 this method renders the svg element in the box and uses the standard d3 api
			 */
			scope.renderData = function(data){
			    //this is where the svg is rendered
			    svg.selectAll('*').remove();

			    if(!data){
				return ; //nothing to render
			    }

			    //setting up width height and color of the svg
			    var width = d3.select(element[0]).node().offsetWidth - 2 * margin,
				color = d3.scale.category10(),
				svGheight = scope.data.length * (barHeight + padding),
				xScale = d3.scale.linear()
				    .domain([0, d3.max(data, function(d){
					return parseInt(d.count_locations);
				    })])
				    .range([0, width]);

			    //creating the svg
			    svg.attr('height', svGheight);

			    svg.selectAll('rect')
				.data(data)
				.enter()
				.append('rect')
				.attr('height', barHeight)
				.attr('width', 140)
				.attr('x', Math.round(margin))
				.attr('y', function(d,i){
				    return i * (barHeight + padding);
				})
				.attr('fill', function(d){
				    return color(d.count_locations);
				})
				.transition()
				.duration(1000)
				.attr('width', function(d){
				    return xScale(d.count_locations);
				});

			    svg.selectAll('text')
				.data(data)
				.enter()
				.append('text')
				.text(function(d){
				    return d.release_year + "(" + (d.count_locations) + ")" ;
				})
				.attr('x', function(d,i){
				    return Math.round(margin + 4);
				})
				.attr('y', function(d,i){
				    return i * (barHeight + padding) + 20;
				})
				.attr("font-family", "sans-serif")
				.attr("font-size", "0.6em")
			    	.attr("font-weight", "500")
				.attr("fill","black");
			};
			
		    });
		}
	    };
	}]);
}());
