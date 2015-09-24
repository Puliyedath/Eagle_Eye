(function(){
    angular.module('sfMovieApp')
	.directive('movieSearch', function(){
	    return{
		restrict: 'E',
		replace: true,
		templateUrl:"/d3/partials/autocomplete.html",
		link: function(scope, elem, attrs){

		    scope.selIndex = 0;
		    scope.selItem = null;

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

				scope.selIndex = 0 ;
				scope.selItem = null;

			    }
			});
		    });


		    scope.isSelected = function(index,count,location) {
			if(scope.selIndex === 'submit'){
			    scope.select(scope.selItem);
			    return false; //check this again 
			}

			if(scope.selIndex == index){
			    scope.selItem = location;
			}

			console.log("sel index is " + scope.selIndex);
			console.log("sel item is " + scope.selItem);
			console.log(scope.selItem);
			console.log("index is " + index);
			if(scope.selIndex >= count){
			    scope.selIndex = 0;
			}
			return scope.selIndex == index;
		    };

		    scope.$watch('selIndex', function(){
			console.log('list fired - digest cycle'); //checking the digest phase : testing purpose
		    });

		    scope.select = function(location){
			scope.visible = false;
			scope.selIndex = 0;
			scope.selItem = null;
			var output = [];
			output.push(location);
			scope.submit(output, true);
		    };

		}
	    };
	});
}());
