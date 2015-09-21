var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieLocationSchema = new Schema({
    title: String,
    actor_1: String,
    locations: String,
    release_year: String,
    production_company: String,
    actor_2: String,
    writer: String,
    director: String,
    actor_3: String
});

//static methods on the schema
movieLocationSchema.statics.createQueryString = function(inputtext){
    if(!inputtext){
	return "";
    }

    var input = inputtext.split(':');
    if(input.length < 2){
	return "";
    }
    
    var output = {};
    input[0] = input[0].trim();
    input[0] = input[0].toLowerCase();
    if (input[0] === 'release'){
	input[0] = 'release_year';
    }
    
    input[1] = new RegExp(input[1].trim(),'i');
    output[input[0]] = input[1];
    return output;
  };

module.exports  = mongoose.model('Location', movieLocationSchema);
