module.exports= function(app){
    var location = require('../models/location');
    var request = require('request');

    /*
     ************************************************************************************************************************************************
     * Route: Route handling the home page or the default entry point
     * Error Handling: Custom error handling middleware takes care of it 
     *************************************************************************************************************************************************
     */
    app.get('/', function(req, res){
	res.render('main.client.view.html');
    });

    /*
     ************************************************************************************************************************************************
     * Route: Route handler for the search suggestions that come from the client
     * Error Handling: sends back an error object to the client (only runs the query if a valid query string is formed at the server side
     *************************************************************************************************************************************************
     */
    app.get('/sResults', function(req,res,next){
	var input = location.createQueryString(req.query.queryString);
	if(input === ""){
	    console.log('invalid');
	    res.send({error: "no matching data"});
	    return;
	}

	location.find(input , function(err, locations){
	    if (err){
		next(err); //calling the next middleware
	    }else{
		res.send(locations);
	    }
	});
    });

    /*
     ************************************************************************************************************************************************
     * Route: runs a aggregation query on external data to get the release year and the number of corresponding shoots which happened in san fransico city
     * Error Handling: if this get request fails the next midldleware get kicked off ( queries the local database)
     *************************************************************************************************************************************************
     */
    
    app.get('/releaseAndLocations',function(req, res,next){
	
	var queryString = '$select=release_year,count(locations)&$group=release_year';
	request.get('https://data.sfgov.org/resource/yitu-d5am.json?' + queryString, function(err,response,body){
	    if(err){
		//soda api failed to give results start using data from the local db
		next();
	    }else{
		console.log(body);
		console.log("Data Received from the external soda2 api");
		res.send(body);
	    }
	});
	
    });

    /*
     ************************************************************************************************************************************************
     * Route: Runs an aggregation on the local database and group the result
     * Error Handling: If no data is received from the database and an empty error object goes to the client
     *************************************************************************************************************************************************
     */
    app.get('/releaseAndLocations', function(req,res, next){
	location.aggregate([{
		$group:{
		    _id: {
			release_year:'$release_year'
		    },
		    count: {
			$sum: 1
		    }

		}
	    },{
		$project:{
		    _id: 0,
		    release_year: '$_id.release_year',
		    count_locations: '$count'
		}
	    }], function(err, locations){
		if(err){
		    console.log("data retrieved from local database");
		    next(err);
		    //res.send({error: "data could not be retrieved" , source: "local cache"});
		}else{
		    console.log("data cached from the database send to the server");
		    res.send(locations);
		}
	});
    });
    
     /*
     ************************************************************************************************************************************************
     * Route: Catch all route for all unhandled request before it hits the express middleware
     * Error Handling: This being the last route , any error here goes to the custom error handler route
     *************************************************************************************************************************************************
     */
    app.get('*', function(req, res){
	res.render('main.client.view.html');
    });

    /*
     ************************************************************************************************************************************************
     * Route: error handler middleware for express
     * Error Handling: last piece of error handling middleware 
     *************************************************************************************************************************************************
     */
    app.use(function(err, req, res, next){
	console.log(err);
	res.statue(500).end({status:500, message:'internal error', type: 'internal'});
    });
};
