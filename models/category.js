var mongoose = require('mongoose');

categorySchema = new mongoose.Schema({
    category: String,
    categorytype: [{
        type: String
    }]
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;