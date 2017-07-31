
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var config = require('./config');

//exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var FacebookStrategy = require('passport-facebook').Strategy;

exports.facebook = passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        enableProof: true
    },
    function (accessToken, refreshToken, profile, done) {
        User.findOne({OauthId: profile.id}, function (err, user) {
            console.log("teste1");
            if (err) {
                console.log("teste2");
                console.log(err); // handle errors!
            }
            if (!err && user !== null) {
                console.log("teste3");
                done(null, user);
            } else {
                console.log("teste4");
                user = new User({
                    username: profile.displayName
                });
                user.OauthId = profile.id;
                user.OauthToken = accessToken;
                user.save(function (err) {
                    if (err) {
                        console.log(err); // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }
));