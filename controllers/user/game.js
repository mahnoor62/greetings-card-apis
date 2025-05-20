const Game = require('../../models/game');
const {success_response, error_response} = require('../../utils/response');
const Game_Customization = require("../../models/game_customization");
const Transaction = require("../../models/transaction");

exports.get_all_games = async (req, res) => {
    try {

        const userId = req.user.user_id;

        const games = await Game.find();

        const yourGames = [];
        const recommendedGames = [];
        const comingSoonGames = [];

        for (let i = 0; i < games.length; i++) {

            const game = games[i].toObject();

            if (!game.launch) {
                comingSoonGames.push(game);
            } else {
                const customization = await Game_Customization.findOne({userId, gameId: game._id}).lean();

                if (customization) {
                    if (customization.isPaid) {
                        game.isPending = false;
                        yourGames.push(game);
                    } else {
                        const transaction = await Transaction.findOne({userId, gameId: game._id});
                        if (transaction && !transaction.approved) {
                            game.isPending = true;
                            yourGames.push(game);
                        } else {
                            yourGames.push(game);
                        }
                    }

                } else {
                    recommendedGames.push(game);
                }
            }
        }

        return success_response(res, 200, "Games fetch successfully", {
            yourGames,
            recommendedGames,
            comingSoonGames,
        });
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
}