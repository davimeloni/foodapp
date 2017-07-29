var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    OauthId: String,
    OauthToken: String,
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    kind: {
        type: String,
        required: true
    },
    isLogged: {
        type: Boolean
    },
    admin: {
        type: Boolean,
        default: false
    }
});

var User = mongoose.model('User', userSchema);
module.exports = User;