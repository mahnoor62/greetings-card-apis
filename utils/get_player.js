const Player = require('../models/player');

exports.get_player = async (name, email, phoneNumber, userId, gameId) => {

    let player = await Player.findOne({name, email, phoneNumber, userId, gameId});
    if (!player) {
        player = await Player.create({
            name,
            email,
            phoneNumber,
            userId,
            gameId
        })
    }

    return player;
}