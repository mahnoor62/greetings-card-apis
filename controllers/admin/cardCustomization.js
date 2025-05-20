const Cards = require('../../models/card');
const {success_response, error_response} = require('../../utils/response');


exports.createCard = async (req, res) => {
    try {
        let {title, cardType, price} = req.body;

        if (!(title && cardType && price)) {
            return error_response(res, 400, "All inputs are required!");
        }

        cardType = cardType.toLowerCase();

        const createCard = await Cards.create({
            title, cardType, price

        })
        return success_response(res, 200, "Card successfully created", createCard);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.getAllCards = async (req, res) => {
    try {
        const allCards = await Cards.find().sort({createdAt: -1});
        return success_response(res, 200, "All cards fetch successfully", allCards);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.uploadFrontDesign = async (req, res) => {
    try {

        const {id} = req.body;

        if (!id) {
            return error_response(res, 400, "Id is  required!");
        }

        const card = await Cards.findOne({_id: id});

        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        if (req.file) {
            card.frontDesign = req.file.path.substring(7);
        }

        await card.save();

        return success_response(res, 200, "Front card uploaded successfully", card);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.uploadBackDesign = async (req, res) => {
    try {

        const {id} = req.body;

        if (!id) {
            return error_response(res, 400, "Id is  required!");
        }

        const card = await Cards.findOne({_id: id});

        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        if (req.file) {
            card.backDesign = req.file.path.substring(7);
        }

        await card.save();

        return success_response(res, 200, "Back card uploaded successfully", card);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.uploadInsideLeftDesign = async (req, res) => {
    try {

        const {id} = req.body;

        if (!id) {
            return error_response(res, 400, "Id is  required!");
        }

        const card = await Cards.findOne({_id: id});

        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        if (req.file) {
            card.insideLeftDesign = req.file.path.substring(7);
        }

        await card.save();

        return success_response(res, 200, "Inside left card uploaded successfully", card);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.uploadInsideRightDesign = async (req, res) => {
    try {

        const {id} = req.body;

        if (!id) {
            return error_response(res, 400, "Id is  required!");
        }

        const card = await Cards.findOne({_id: id});

        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        if (req.file) {
            card.insideRightDesign = req.file.path.substring(7);
        }

        await card.save();

        return success_response(res, 200, "Inside right card uploaded successfully", card);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.uploadVideo = async (req, res) => {
    try {

        const {id} = req.body;

        if (!id) {
            return error_response(res, 400, "Id is  required!");
        }

        const card = await Cards.findOne({_id: id});

        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        if (req.file) {
            card.video = req.file.path.substring(7);
        }

        await card.save();
        return success_response(res, 200, "Video uploaded successfully", card);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.getCard = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return error_response(res, 400, "Id is required!");
        }

        const card = await Cards.findOne({_id: id});

        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        return success_response(res, 200, "Card get successfully", card);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.destroyCard = async (req, res) => {
    try {
        const {id} = req.params;

        if (!id) {
            return error_response(res, 400, "Id is required!");
        }

        const card = await Cards.findByIdAndDelete(id);

        if (!card) {
            return error_response(res, 404, "Card not found!");
        }

        return success_response(res, 200, "Card deleted successfully", card);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};