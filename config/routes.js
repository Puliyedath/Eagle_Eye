module.exports= function(app){
    var location = require('../models/location');

    app.get('/', function(req, res){
	res.render('main.client.view.html');
    });

    app.get('/sResults', function(req,res){
	var input = location.createQueryString(req.query.queryString);
	if(input === ""){
	    console.log('invalid');
	    res.send({error: "no matching data"});
	    return;
	}
	
	location.find(input, function(err, locations){
	    //console.log(locations);
	    if (err){
		res.send({error: "no records could be retrieved"});
	    }else{
		res.send(locations);
	    }
	});
    });

    app.get('/all', function(req,res){
	location.find({}, function(err, locations){
	    if (err){
		res.send({error: "no records could be retrieved"});
	    }else{
		res.send(locations);
	    }
	});
    });

    //catch all route
    app.get('*', function(req, res){
	res.render('main.client.view.html');
    });
};
