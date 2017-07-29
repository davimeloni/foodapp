var mongoose = require('mongoose');
var dbUrl = 'mongodb://admin:123@ds115583.mlab.com:15583/foodapp';
//var dbUrl = 'mongodb://localhost:27017/foodapp';
var retry = null;

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbUrl);
});

mongoose.connection.on('error', function(err) {
    console.log('Db connection error... ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('disconnected from ' + dbUrl);
});

