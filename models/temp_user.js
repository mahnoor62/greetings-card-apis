const mongoose = require('mongoose');

const tempUser = new mongoose.Schema({
    userId: {type: String},
    gameId: {type: mongoose.Schema.Types.ObjectId, ref: 'game'},
    title: {type: String, default: 'Brand Name'},
    backgroundImage: {type: String, default: null},
    backgroundColor: {type: String, default: null},
    backgroundMusic: {type: String, default: null},
    logoImage: {type: String, default: null},
    buttonCode: {type: String, default: null},
    // isPaid: {type: Boolean, default: false},
});

module.exports = mongoose.model('temp_user', tempUser);