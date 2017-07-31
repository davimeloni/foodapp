var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');
var User = require('../models/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');


module.exports = function (app, passport) {

    facebookUser: {};
    //var token = '';

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: config.secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))

    passport.serializeUser(function(user, done) {
        token = jwt.sign({username: user.username, email: user.email}, config.secretKey, {expiresIn: '24h'});
        done(null, user.OauthId);
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email'],

    },
        function (accessToken, refreshToken, profile, done) {
            //console.log(profile._json.email);

            User.findOne({'OauthId': profile.id}, function (err, user) {
                if (err) return done(err);
                if(user) {
                    facebookUser = user;
                    return done(null, facebookUser);
                } else {
                    var newUser = new User();

                    newUser.OauthId = profile.id; // set the users facebook id                   
                    newUser.OauthToken = token; // we will save the token that facebook provides to the user                    
                    //newUser.username = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.username = profile.displayName;
                    newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    newUser.save(function (err) {
                        if(err) throw err;
                        facebookUser = newUser;
                        return done(null, facebookUser);
                    })
                }
            })
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
        res.redirect('/#!/selecttable/' + facebookUser.email + '/' + facebookUser.OauthToken);
        console.log("aqui é o res" + res.body);
        console.log("-------------------------");
        console.log("aqui é o req " + req.body);
        console.log(facebookUser);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    return passport;
}