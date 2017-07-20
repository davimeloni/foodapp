var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
    tableNumber: {
        type: number,
        required: true
    },
    seats: {
        type: Number
    },
    users: {
        type: [Users(client)],
    },
    waiter: {
        type: User(waiter)
    },
    open: {
        type: Boolean,
        default: true
    }
});

var Table = mongoose.model('Table', tableSchema);
module.exports = Table;