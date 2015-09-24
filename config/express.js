module.exports = function(config){

    //connect to the database
    require('./mongoose')(config);

    var express  = require('express');
    var bodyParser = require('body-parser');
    var app = express();
    app.engine('html', require('ejs').renderFile);

    //setting up custom middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
	extended: true
    }));

    //configuring the static routes
    app.use(express.static('./public'));

    //setting the usecash environment flag as an app level variable 
    app.set('USECACHE', config.USECACHE);

    //configuring the dynamic routes
    require('./routes')(app);

    return app;
};
