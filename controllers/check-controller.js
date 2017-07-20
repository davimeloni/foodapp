var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Check = require('../models/check');

module.exports.createCheck = function (req, res) {

    Check.create(req.body, function (err, check) {
        if (err) throw err;
        console.log(check._id + " check was created");
    });

}

module.exports.getCheck = function (req, res) {
    Check.findById(req.params.checkId, function (err, check) {
        if (err) throw err;
        console.log(check.counter + " getting...");
        res.json(check);
    })
}

module.exports.updateCheck = function (req, res) {
    console.log(req.body);
    Check.findByIdAndUpdate(req.params.checkId, { $set: req.body }, { new: true }, function (err, check) {
        if (err) throw err;
        console.log(check._id + " check was updated");
    });
}

module.exports.updateItemCheck = function (req, res) {
    console.log(req.body);

    Check.findById(req.params.checkId, function (err, check) {
        if (err) throw err;
        console.log("check found..");
        check.orderedItens.push(req.body.orderedItens);
        
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log(check);

        check.save(function(err, check) {
            if(err) throw err;
            console.log("check updated");
        })

    });
}
