const mongoose = require('mongoose');

const cardCustomizationSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    cardId: {type: mongoose.Schema.Types.ObjectId, ref: 'card'},
    arTemplateData: {type: mongoose.Schema.Types.Mixed},
    isPaid: {type: Boolean, default: false},
});

module.exports = mongoose.model('card-customization', cardCustomizationSchema);