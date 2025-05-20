const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {type: String},
    email: {type: String},
    password: {type: String},
    isVerified: {type: Boolean, default: false},
    token: {type: String},
});

module.exports = mongoose.model('user', userSchema);
