const mongoose = require('mongoose');

const gameCustomizationSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'game'},
    title: {type: String},
    backgroundImage: {type: String, default: null},
    backgroundColor: {type: String, default: null},
    backgroundMusic: {type: String, default: null},
    logoImage: {type: String, default: null},
    buttonCode: {type: String, default: null},
    isPaid: {type: Boolean, default: false},
});

module.exports = mongoose.model('game-customization', gameCustomizationSchema);