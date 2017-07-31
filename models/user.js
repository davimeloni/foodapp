var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    kind: {
        type: String,
        
    },
    isLogged: {
        type: Boolean
    },
    admin: {
        type: Boolean,
        default: false
    }
});

//userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;