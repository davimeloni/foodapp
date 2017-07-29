var localStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({'email': email}, function(err, user) {
                if (err) throw err;
                //user already exists
                if(user){
                    return done(null, false, req.flash('signupMessage', 'That email already taken'));
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = password;

                    newUser.save(function(err, user) {
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }
));

}