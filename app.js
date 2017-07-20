var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//variable path to routes
var routes = require('./routes/routes');

//connect to DB
require('./db/db');

//initialize app express
var app = express();

//define port
app.set('port', (process.env.PORT || '3000'));
//Request listener
var server = app.listen(app.get('port'), function() {
    var address = server.address().port
    console.log("Running on port " + address);
});

//middleware to log every request
app.use(function(req, res, next) {
    //print log
    console.log(req.method, req.url);
    //call the next function
    next();
});

//set directories the app will use
app.use(express.static(path.join(__dirname, "public")));

//enable parsing forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api routes
app.use('/', routes);

