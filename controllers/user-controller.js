var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/user');

module.exports.getUserByEmail = function (req, res) {
  console.log(req.params.email);
  var email = req.params.email;
  User.findOne({ "email": email }, function (err, user) {
    if (err) throw err;
    res.json(user);
  })
}