const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'game'},
    transactionId: {type: String},
    approved: {type: Boolean, default: false},
}, { timestamps: true });

module.exports = mongoose.model('transaction', transactionSchema);