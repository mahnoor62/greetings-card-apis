const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String},
    slug: {type: String, unique: true},
    launch: {type: Boolean},
    // image: {type: String},
    description: {type: String},

});

module.exports = mongoose.model('game', gameSchema);