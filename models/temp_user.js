const mongoose = require('mongoose');

const tempUser = new mongoose.Schema({
    userId: {type: String},
    cardId: {type: mongoose.Schema.Types.ObjectId, ref: 'card'},
    title: {type: String, default: 'Greetings Card'},
    frontDesign: {type: String, default: null},
    backDesign: {type: String, default: null},
    insideLeftDesign: {type: String, default: null},
    insideRightDesign: {type: String, default: null},
    video: {type: String, default: null},
    // isPaid: {type: Boolean, default: false},
});

module.exports = mongoose.model('temp_user', tempUser);