const Games = require('../../models/game');
const {success_response, error_response} = require('../../utils/response');
const Game = require("../../models/game");

exports.get_all_games = async (req, res) => {
    try {
        const games = await Game.find();
        if (!games) {
            return error_response(res, 400, "Games not found!");
        }
        return success_response(res, 200, "Games fetch successfully", games);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);

    }
}