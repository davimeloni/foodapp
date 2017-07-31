var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
//var session = require('express-session');
var passport = require('passport');
//var flash = require('connect-flash');

//connect to DB
require('./config/db');

//variable path to routes
var routes = require('./routes/routes');

//initialize app express
var app = express();
//define port
app.set('port', (process.env.PORT || '3000'));

var socialauth = require('./config/passport')(app, passport);
//middlewares -------------------------------

//app.use(morgan('dev'));
app.use(cookieParser());

//app.use(passport.initialize());
//app.use(passport.session());
//app.use(flash());

//set directories the app will use
app.use(express.static(path.join(__dirname, "public")));
//enable parsing forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//log every request
app.use(function (req, res, next) {
    //print log
    console.log(req.method, req.url);
    //console.log(req.cookies);
    //call the next function
    next();
});

//api routes
app.use('/', routes);
//-----------------------------------------------

//Request listener
var server = app.listen(app.get('port'), function () {
    var address = server.address().port
    console.log("Running on port " + address);
});


