(function (){

    //loads up the dev variable environment in case the PROD flag for prod boxes are not set
    var suffix = process.env.PROD || "dev";
    var config = require("./config/env/vars_" + suffix + ".js");

    
    var app = require('./config/express')(config);
        
    //entry point for the main view
    app.set('views', __dirname + '/public/main/views');
    
    app.listen(config.port,function(){
	console.log("server stared on the port " + config.port);
    });
    
})();
