const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    phoneNumber: {type: String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'game'},
});

module.exports = mongoose.model('player', playerSchema);