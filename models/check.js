var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var SchemaTypes = mongoose.Schema.Types;

var orderItemSchema = new mongoose.Schema({
    orderedItem: {
        type: SchemaTypes.ObjectId, ref: 'Item'
    },
    additionals: {
        type: [String]
    },
    status: {
        type: String
    },
}, {
    timestamps: true
});

var checkSchema = new mongoose.Schema({
    counter: {
        type: Number,
        required: true,
        unique: true
    },
    client: {
        type: SchemaTypes.ObjectId, ref: 'User'
    },
    orderedItens: {
        type: [orderItemSchema]
    },
    price: {
        type: Currency,
    },
    status: {
        type: String,
    },
    table: {
        type: SchemaTypes.ObjectId, ref: 'Table'
    }

}, {
    timestamps: true
});

var Check = mongoose.model('Check', checkSchema);
module.exports = Check;