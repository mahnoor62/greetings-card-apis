const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    email: {type: String},
    code: {type: String},
    unique_id: {type: String}
});

module.exports = mongoose.model("temp_user", tempUserSchema);