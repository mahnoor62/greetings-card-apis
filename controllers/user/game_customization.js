// const {success_response, error_response} = require('../../utils/response');
// const {get_record} = require('../../utils/get_record');
// const Game = require('../../models/game');
// const Game_Customization = require('../../models/card_customization');
// const Transaction = require('../../models/transaction');
// const GameCustomization = require("../../models/card_customization");
//
// exports.update_background_image = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//
//         const {slug} = req.body;
//
//         if (!(userId && slug)) {
//             return error_response(res, 400, "user id and slug is required!");
//         }
//
//         const game = await Game.findOne({slug});
//         const gameId = game._id;
//         let record = await get_record(userId, gameId);
//         if (record) {
//             if (req.file) {
//                 record.backgroundImage = req.file.path.substring(7);
//                 record.backgroundColor = null;
//             }
//         }
//         await record.save();
//         return success_response(res, 200, "Background image updated successfully", record)
//     } catch (error) {
//         console.log(error);
//         console.error(res, 500, error.message);
//     }
// };
//
// exports.logo_image = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const {slug} = req.body;
//         if (!(slug)) {
//             return error_response(res, 400, "Slug is required!");
//         }
//         const game = await Game.findOne({slug});
//         const gameId = game._id;
//         let record = await get_record(userId, gameId);
//         if (record) {
//             if (req.file) {
//                 record.logoImage = req.file.path.substring(7)
//             }
//         }
//         await record.save();
//         return success_response(res, 200, "Background image updated successfully", record)
//     } catch (error) {
//         console.log(error);
//         console.error(res, 500, error.message);
//     }
// };
// exports.bg_music = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const {slug} = req.body;
//
//         if (!(slug)) {
//             return error_response(res, 400, "Slug is required!");
//         }
//         const game = await Game.findOne({slug});
//         const gameId = game._id;
//
//         let record = await get_record(userId, gameId);
//
//         if (record) {
//             if (req.file) {
//                 record.backgroundMusic = req.file.path.substring(7)
//             }
//         }
//         await record.save();
//         return success_response(res, 200, "Background music updated successfully", record)
//     } catch (error) {
//         console.log(error);
//         console.error(res, 500, error.message);
//     }
// };
//
// exports.update_title = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const {title, slug} = req.body;
//         if (!(title && userId && slug)) {
//             return error_response(res, 400, "Title is required to update it");
//         }
//         const game = await Game.findOne({slug});
//         const gameId = game._id;
//         let record = await get_record(userId, gameId);
//
//         if (record) {
//             record.title = title
//         }
//         await record.save();
//         return success_response(res, 200, "Title updated successfully", record);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
//
// exports.update_button_code = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const {slug, color} = req.body;
//         if (!(userId && slug && color)) {
//             return error_response(res, 400, "All inputs are required!");
//         }
//         const game = await Game.findOne({slug});
//         const gameId = game._id;
//         let record = await get_record(userId, gameId);
//         if (record) {
//             record.buttonCode = color
//         }
//         await record.save();
//         return success_response(res, 200, "Button color updated successfully", record);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
// exports.update_background_code = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const {slug, backgroundColor} = req.body;
//         if (!(userId && slug && backgroundColor)) {
//             return error_response(res, 400, "All inputs are required!");
//         }
//         const game = await Game.findOne({slug});
//         const gameId = game._id;
//         let record = await get_record(userId, gameId);
//         if (record) {
//             record.backgroundColor = backgroundColor
//             record.backgroundImage = null;
//         }
//         await record.save();
//         return success_response(res, 200, "Background color updated successfully", record);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
//
// exports.get_user_customization = async (req, res) => {
//     try {
//
//         const userId = req.user.user_id;
//         const {slug} = req.params;
//         if (!slug) {
//             return error_response(res, 400, "slug is required!");
//         }
//         const game = await Game.findOne({slug});
//         const gameId = game._id;
//
//         let record = await GameCustomization.findOne({userId, gameId});
//
//         const transaction = await Transaction.findOne({userId, gameId})
//
//         if (!record) {
//             record = {};
//             record.transactionStatus = false;
//             record.transactionFound = false;
//             record.userId = userId;
//             record.gameId = gameId;
//             record.title = game.name || 'Brands Name';
//             record.backgroundImage = null;
//             record.backgroundColor = null;
//             record.backgroundMusic = null;
//             record.logoImage = null;
//             record.buttonCode = null;
//             record.isPaid = false;
//         }
//         if (transaction) {
//             record.transactionFound = true;
//             record.transactionStatus = transaction.approved;
//         }
//         return success_response(res, 200, "User customization fetch successfully", record);
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
//
// exports.get_user_paid_games = async (req, res) => {
//     try {
//         const userId = req.user.user_id;
//         const paidGamesOfUsers = await Game_Customization.find({userId}).populate('gameId');
//
//         if (paidGamesOfUsers.length > 0) {
//             const paidGames = paidGamesOfUsers.filter(game => game.isPaid === true);
//             if (paidGames.length > 0) {
//                 return success_response(res, 200, "Paid games of user fetched successfully", paidGames);
//             }
//         }
//
//     } catch (error) {
//         console.log(error);
//         return error_response(res, 500, error.message);
//     }
// };
//
