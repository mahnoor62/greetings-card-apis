const mongoose = require('mongoose');
const passwordSchema = new mongoose.Schema({
    email: {type: String},
    token: {type: String},
});
module.exports = mongoose.model('password', passwordSchema);