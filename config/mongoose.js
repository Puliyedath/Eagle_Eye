module.exports=function(config){
    var mongoose = require('mongoose');
    mongoose.connect(config.db);
};
