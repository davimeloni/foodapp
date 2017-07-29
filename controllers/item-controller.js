var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Item Model
var Item = require('../models/item');

//functions to route: item
module.exports.getAllItens = function(req, res) {
    //query to find itens
    Item.find(req.query)
        //execute query, return error or the itens
        .exec(function(err, itens) {
            if (err) throw err;
            res.json(itens);
            //console.log(itens);
        });
};

module.exports.createItem = function(req, res) {
    //create item
    Item.create(req.body, function(err, item) {
        if (err) throw err;
        console.log("Item created");

        //response telling the item was created
        var id = item._id;
        //response with 200 = ok
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        //body of response
        res.end('Item ' + id + ' added successful');
    });
}

module.exports.updateItem = function(req, res) {
    console.log(req.params.itemId);
    Item.findByIdAndUpdate(req.params.itemId, {$set: req.body}, {new: true}, function(err, item) {
        if (err) throw err;
        res.json(item);
        console.log(item);
    })
}

module.exports.deleteItem = function(req, res) {

    Item.findByIdAndRemove(req.params.itemId, function(err, item) {
        if (err) throw err;
        res.json(item);
        console.log(item);
    })
}