const {success_response, error_response} = require('../utils/response');
const Game = require('../models/game');

exports.get_all_games = async (req, res) => {
    try {

        const game = await Game.find();

        return success_response(res, 200, "Games fetch successfully", game);
    } catch
        (error) {
        console.log(error);
        return error_response(res, 400, error.message);
    }
}