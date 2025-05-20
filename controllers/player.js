const progress = require('../models/player_progress');
const {success_response, error_response} = require('../utils/response');
const {get_player} = require('../utils/get_player');
const Game = require('../models/game');

exports.create_player = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const {name, email, phoneNumber, slug} = req.body;
        if (!(name && email && phoneNumber && slug)) {
            return error_response(res, 400, "All inputs are required!");
        }
        const game = await Game.findOne({slug});
        const gameId = game._id;

        const player = await get_player(name, email, phoneNumber, userId, gameId);

        return success_response(res, 200, "Player already created!", player);
    } catch
        (error) {
        console.log(error);
        return error_response(res, 400, error.message);
    }
}

exports.update_score = async (req, res) => {
    try {
        let record;
        const authId = req.user.user_id;
        const {playerId, slug, score} = req.body;

        if (!(playerId && slug && score)) {
            return error_response(res, 400, "All inputs are required!");
        }
        const game = await Game.findOne({slug});

        const gameId = game._id;
        const previousRecord = await progress.findOne({playerId, userId: authId, gameId});

        if (!previousRecord) {
            record = await progress.create({
                playerId,
                userId: authId,
                gameId,
                score
            });
            return success_response(res, 200, "Score Updated successfully", record);
        }
        previousRecord.score = score;
        previousRecord.markModified('score');
        await previousRecord.save();

        return success_response(res, 200, "Score Updated successfully", previousRecord);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
}


exports.get_Leader_board = async (req, res) => {
    try {
        const {slug} = req.params;
        const userId = req.user.user_id;
        const game = await Game.findOne({slug});
        const gameId = game._id;
        const limit = parseInt(req.query.limit) || 3;
        const leaderBoard = await progress.find({gameId, userId})
            .populate('userId gameId playerId', 'name')
            .select("userId score")
            .limit(limit)
            .sort({score: -1})
            .exec();
        return success_response(res, 200, "Leader Board fetch successfully", leaderBoard);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
}