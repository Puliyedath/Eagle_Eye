(function(){
    angular.module('sfMovieApp')
	.directive('movieSearch', function(){
	    return{
		restrict: 'E',
		replace: true,
		templateUrl:"/d3/partials/autocomplete.html",
		link: function(scope, elem, attrs){

            scope.selIndex = 0;
            
		    //attaching the event listeninger to the ul 
		    elem.bind("keydown keypress", function (event){
                scope.$apply(function(){
                    if(scope.visible){
                        //frustrating -they changed the keycode props form keyCode to stupid which
                        //9 because the partial for this has a limitto filter applied as 9 
                        if(event.which == 40 && (scope.selIndex < 9)){
                            scope.selIndex = scope.selIndex + 1;
                            return;
                        }

                        //making sure that the sel Index is not negative
                        if(event.which == 38 && (scope.selIndex >= 1)){
                            scope.selIndex = scope.selIndex - 1;
                            return;
                        }

                        //submit the form for enter key
                        if(event.which == 13){
                            scope.selIndex = 'submit';
                            return;
                        }

                        //like a reset
                        scope.selIndex = 0;
                    }
                });
		    });


            scope.isSelected = function(index,count,location) {
                if(scope.selIndex === 'submit'){
                    scope.select(scope.selItem);
                    return;
                }

                scope.selItem = location;
                console.log(scope.selIndex);
                console.log(index);
                return scope.selIndex == index;
            }

            scope.$watch('selIndex', function(){
                console.log('list fired - digest cycle');
            });

		    scope.select = function(location){
			scope.visible = false;
            scope.selIndex = 0;
			var output = [];
			output.push(location);
			scope.submit(output, true);
		    };

		}
	    };
	});
}());
