const GameCustomization = require('../models/game_customization');
// const TempUser = require('../models/temp_user');

exports.get_record = async (userId, gameId) => {

    let record = await GameCustomization.findOne({userId, gameId});

    if (!record) {
        record = await GameCustomization.create({
            userId,
            gameId
        })
    }

    return record;
};

// exports.temp_user = async (userId, gameId) => {
//
//     let record = await TempUser.findOne({userId, gameId});
//
//     if (!record) {
//         record = await TempUser.create({
//             userId,
//             gameId
//         })
//     }
//
//     return record;
// }