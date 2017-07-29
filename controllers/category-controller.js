var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Category Model
var Category = require('../models/category');

//functions to route: category
module.exports.getAllCategories = function(req, res) {
    //query to find categories
    Category.find(req.query)
        //execute query, return error or the categories
        .exec(function(err, categories) {
            if (err) throw err;
            res.json(categories);
            //console.log(categories);
        });
};

module.exports.createCategory = function(req, res) {
    //create category
    Category.create(req.body, function(err, category) {
        if (err) throw err;
        console.log("Category created");

        //response telling the category was created
        var id = item._id;
        //response with 200 = ok
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        //body of response
        res.end('Item ' + id + ' added successful');
    });
}