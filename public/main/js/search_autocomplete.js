(function(){
    document.getElementById("search").oninput = logEvent;
    document.getElementById("search").onchange = logEvent;
    document.getElementById("search").onkeydown = logEvent;
    document.getElementById("search").onkeypress = logEvent;
    document.getElementById("search").onkeyup = logEvent;
    document.getElementById("search").onpaste = logEvent;

    function logEvent(e){
	console.log(e.type + "-" + e.keyCode);
    };
})();
