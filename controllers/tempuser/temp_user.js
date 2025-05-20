const {success_response, error_response} = require('../../utils/response');
const Game = require('../../models/game');
const {temp_user} = require('../../utils/get_record');
const {v4: uuidv4} = require('uuid');
const TempUser = require('../../models/temp_user');
const GameCustomization = require("../../models/game_customization");
const Transaction = require("../../models/transaction");


exports.create_temp_user = async (req, res) => {
    try {
        const userId = uuidv4();
        const {slug} = req.params;
        const game = await Game.findOne({slug});
        const gameId = game._id;
        const tempUser = await TempUser.create({userId, gameId});
        const oldUser = await TempUser.findOne({userId: tempUser.userId, gameId});
        if (oldUser) {
            return success_response(res, 200, "Temporary user created successfully", oldUser)
        }
        return success_response(res, 200, "Temporary user created successfully", tempUser)

    } catch (error) {
        console.log(error);
        console.error(res, 500, error.message);
    }
};

exports.upload_bgImage = async (req, res) => {
    try {
        const {slug, userId} = req.body;
        if (!(slug && userId)) {
            return error_response(res, 400, "Slug and user id  is required!");
        }

        const game = await Game.findOne({slug});
        const gameId = game._id;

        const record = await TempUser.findOne({userId, gameId});
        if (record) {
            if (req.file) {
                record.backgroundImage = req.file.path.substring(7);
                record.backgroundColor = null;
            }
            await record.save();
        }
        return success_response(res, 200, "Background image updated successfully", record)

    } catch (error) {
        console.log(error);
        console.error(res, 500, error.message);
    }
};
exports.upload_logoImage = async (req, res) => {
    try {
        const {slug, userId} = req.body;
        if (!(slug && userId)) {
            return error_response(res, 400, "Slug and user id  is required!");
        }

        const game = await Game.findOne({slug});
        const gameId = game._id;

        const record = await TempUser.findOne({userId, gameId});
        if (record) {
            if (req.file) {
                record.logoImage = req.file.path.substring(7);
            }
            await record.save();
        }
        return success_response(res, 200, "Logo updated successfully", record)

    } catch (error) {
        console.log(error);
        console.error(res, 500, error.message);
    }
};
exports.update_button_color = async (req, res) => {
    try {
        const {slug, userId, color} = req.body;
        if (!(slug && userId && color)) {
            return error_response(res, 400, "All inputs are  required!");
        }

        const game = await Game.findOne({slug});
        const gameId = game._id;

        const record = await TempUser.findOne({userId, gameId});
        if (record) {
            record.buttonCode = color
            await record.save();
        }
        return success_response(res, 200, "Button color  updated successfully", record)

    } catch (error) {
        console.log(error);
        console.error(res, 500, error.message);
    }
};
exports.update_title = async (req, res) => {
    try {
        const {slug, userId, title} = req.body;
        if (!(slug && userId && title)) {
            return error_response(res, 400, "All inputs are  required!");
        }

        const game = await Game.findOne({slug});
        const gameId = game._id;

        const record = await TempUser.findOne({userId, gameId});
        if (record) {
            record.title = title
            await record.save();
        }
        return success_response(res, 200, "Title updated successfully", record)

    } catch (error) {
        console.log(error);
        console.error(res, 500, error.message);
    }
};
exports.update_background_color = async (req, res) => {
    try {
        const {slug, userId, color} = req.body;
        if (!(slug && userId && color)) {
            return error_response(res, 400, "All inputs are  required!");
        }

        const game = await Game.findOne({slug});
        const gameId = game._id;

        const record = await TempUser.findOne({userId, gameId});
        if (record) {
            record.backgroundColor = color;
            record.backgroundImage = null;

            await record.save();
        }
        return success_response(res, 200, "Background color updated successfully", record)

    } catch (error) {
        console.log(error);
        console.error(res, 500, error.message);
    }
};

exports.upload_bgMusic = async (req, res) => {
    try {
        const {slug, userId} = req.body;
        if (!(slug && userId)) {
            return error_response(res, 400, "Slug and user id  is required!");
        }

        const game = await Game.findOne({slug});
        const gameId = game._id;

        const record = await TempUser.findOne({userId, gameId});
        if (record) {
            if (req.file) {
                record.backgroundMusic = req.file.path.substring(7);
            }
            await record.save();
        }
        return success_response(res, 200, "Background music updated successfully", record)

    } catch (error) {
        console.log(error);
        console.error(res, 500, error.message);
    }
};
exports.get_user_customization = async (req, res) => {
    try {

        const {slug, userId} = req.body;
        if (!(slug && userId)) {
            return error_response(res, 400, "slug is required!");
        }
        const game = await Game.findOne({slug});
        const gameId = game._id;

        const record = await TempUser.findOne({userId, gameId});
        if (record) {
            return success_response(res, 200, "User customization fetch successfully", record);
        }
        return success_response(res, 200, "User customization fetch successfully", {});
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};