const GameCustomization = require('../../models/game_customization');
const {success_response, error_response} = require('../../utils/response');
const Game = require('../../models/game');

exports.publish_game = async (req, res) => {
    try {
        const {slug} = req.params;
        const userId = req.user.user_id;
        if (!slug) {
            return error_response(res, 400, "slug is required!");
        }
        const game = await Game.findOne({slug});
        const gameId = game._id;

        const customization = await GameCustomization.findOne({userId, gameId});
        return success_response(res, 200, "Published successfully", customization);
    } catch (error) {
        console.log(error)
        return error_response(res, 500, error.message);
    }
}