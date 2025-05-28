// const Progress = require('../../models/player_progress');
// const {success_response, error_response} = require('../../utils/response');
//
// exports.get_players_details = async (req, res) => {
//     try {
//         const authId = req.user.user_id;
//         const getPlayerDetails = await Progress.find({userId: authId}).populate('playerId gameId', 'name email phoneNumber').exec();
//         if (getPlayerDetails.length > 0) {
//             return success_response(res, 200, "Detail of players fetched successfully", getPlayerDetails);
//         }
//
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// }