const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({

    title: {type: String},
    cardType: {
        type: [String],

    },
    // cardType: {
    //     type: String,
    //     required: true,
    //     enum: ['birthday', 'marriage', 'mothers day', 'fathers day', 'sister day','anniversary', 'valentines day', 'marry christmas'],
    // },
    price: {
        type: Number
    },
    frontDesign: {type: String, default: null},
    backDesign: {type: String, default: null},
    insideLeftDesign: {type: String, default: null},
    insideRightDesign: {type: String, default: null},
    video: {type: String, default: null}

}, {timestamps: true});

module.exports = mongoose.model('card', cardSchema);