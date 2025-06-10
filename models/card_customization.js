const mongoose = require('mongoose');

const cardCustomizationSchema = new mongoose.Schema({
    userId: {type: String, default: null},
    cardId: {type: mongoose.Schema.Types.ObjectId, ref: 'card'},
    arTemplateData: {type: mongoose.Schema.Types.Mixed, default: null},
    templateImage0: {type: String, default: null},
    templateImage1: {type: String, default: null},
    templateImage2: {type: String, default: null},
    templateImage3: {type: String, default: null},
    templateImage4: {type: String, default: null},
    templateImage5: {type: String, default: null},
    templateVideo: {type: String, default: null},
    isPaid: {type: Boolean, default: false},
});

module.exports = mongoose.model('card-customization', cardCustomizationSchema);