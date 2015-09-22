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
			var barHeight = parseInt(attrs.barHeight) || 20;
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

			//watch to rerender the svg when the data changes
			scope.$watch('data', function(newValue, oldValue){
			    return scope.renderData(newValue); 
			},true);

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
					return d.score;
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
				    return color(d.score);
				})
				.transition()
				.duration(1000)
				.attr('width', function(d){
				    return xScale(d.score);
				});

			    
			};
			
		    });
		}
	    };
	}]);
}());
