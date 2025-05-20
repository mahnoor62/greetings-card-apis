const mongoose = require('mongoose');

const updateScoreSchema = new mongoose.Schema({
    playerId: {type: mongoose.Schema.Types.ObjectId, ref: 'player'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'game'},
    score: {type:Number},
});

module.exports = mongoose.model('player-progress', updateScoreSchema);
