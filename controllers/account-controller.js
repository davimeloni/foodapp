var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Account = require('../models/account');

module.exports.createAccount = function (req, res) {
    Account.findOne({}, {}, { sort: { 'createdAt': -1 } }, function (err, account) {
        if (err) throw (err);
        var increment = 1;

        if (account) {
            increment = account.counter + 1;
        }
        var newAccount = new Account(req.body);
        newAccount.counter = increment;
        console.log(newAccount);
        newAccount.save(function (err, accountCreated) {
            if (err) throw (err);
            console.log("account created");
            console.log(accountCreated);
            res.json(accountCreated);
        })
    });
}

//get all accounts
module.exports.getAllAccounts = function(req, res) {
    Account.find({})
            .populate('orderedItens.orderedItem')
            .populate('customer')
            .exec(function(err, accounts) {
                if (err) throw err;
                console.log("getting all accounts");
                res.json(accounts);
    })
}

//get the last account created
module.exports.getLastAccount = function (req, res) {
    Account.findOne().sort({ 'createdAt': -1 })
        .exec(function (err, account) {
            if (err) throw err;
            res.json(account.counter);
            console.log(account.counter);
        });
}

//get account by id
module.exports.getAccount = function (req, res) {
    Account.findById(req.params.accountId)
        .populate('orderedItens.orderedItem')
        .populate('customer')
        .exec(function (err, account) {
            if (err) throw err;
            console.log(account.counter + " getting...");
            res.json(account);
        })
}

//update account
module.exports.updateAccount = function (req, res) {
    console.log(req.body);
    Account.findByIdAndUpdate(req.params.accountId, { $set: req.body }, { new: true }, function (err, account) {
        if (err) throw err;
        console.log(account._id + " account was updated");
        console.log(account);
    });
}

//add item to an account
module.exports.addItemAccount = function (req, res) {
    console.log(req.body);

    Account.findById(req.params.accountId, function (err, account) {
        if (err) throw err;
        console.log("account found.." + account._id);
        account.orderedItens.push(req.body.orderedItens);
        account.price = account.price + req.body.orderedItens.orderedItem.price;

        console.log(account._id);

        account.save(function (err, account) {
            if (err) throw err;
            console.log("account updated with new item");
            console.log("printing the new account");
            console.log(account);
        })

    });
}

//update item or itens in an account
module.exports.updateItensAccount = function (req, res) {
    console.log("updating itens");

    //if updating array
    if (Array.isArray(req.body.orderedItens)) {

        req.body.orderedItens.forEach(function (item) {
            console.log(item);

            Account.update({ _id: req.params.accountId, 'orderedItens._id': item._id },
                { $set: { 'orderedItens.$.status': item.status } }, function (err, account) {
                    if (err) throw err;
                    console.log(account);
                })
        }, this);

        //if updating one item
    } else {

        Account.update({ _id: req.params.accountId, 'orderedItens._id': req.body.orderedItens._id },
            { $set: { 'orderedItens.$.status': req.body.orderedItens.status } }, function (err, account) {
                if (err) throw err;
                console.log(account);
            })

    }

}

//delete item from account
module.exports.deleteItemAccount = function (req, res) {
    Account.findOneAndUpdate({ _id: req.params.accountId }, { $pull: { orderedItens: { _id: req.params.itemId } } }, function (err, account) {
        if (err) throw err;
        console.log("item deleted");
        console.log(req.body);
        account.price = account.price - req.body.item.orderedItem.price;

        account.save(function(err, account) {
            if (err) throw err;
            console.log("updated account");
            console.log(account);
        })

    });
}

//get accounts for kitchen
module.exports.getAccountItensKitchen = function (req, res) {
    Account.find({ $or: [{ "orderedItens.status": "Ordered" }, { "orderedItens.status": "Cooking" }] })
        .populate('orderedItens.orderedItem')
        .populate('customer')
        .exec(function (err, accounts) {
            if (err) throw err;
            res.json(accounts);
            //console.log(accounts);
        });
}

//get accounts by status
module.exports.getItensAccountsByStatus = function (req, res) {
    Account.find({ "status": "Opened" })
        .populate('orderedItens.orderedItem')
        .populate('customer')
        .exec(function (err, accounts) {
            if (err) throw err;
            res.json(accounts);
            //console.log(accounts);
        });
}
