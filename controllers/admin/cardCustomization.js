const Cards = require('../../models/card');
const TemplateData = require('../../models/templateData');
const CardsCustomization = require('../../models/card_customization');
const {success_response, error_response} = require('../../utils/response');
const API_URL = process.env.API_URL;
const {v4: uuidv4} = require('uuid');
const BACKEND_URL = process.env.API_URL;

exports.createCard = async (req, res) => {
    try {
        let {title, cardType, price} = req.body;

        if (!(title && cardType && price)) {
            return error_response(res, 400, "All inputs are required!");
        }

        // cardType = cardType.toLowerCase();

        const createCard = await Cards.create({
            uuid: uuidv4(),
            title, cardType, price

        })
        return success_response(res, 200, "Card successfully created", createCard);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
exports.EditCard = async (req, res) => {
    try {
        let {title, cardType, price, id} = req.body;

        if (!id) {
            return error_response(res, 400, "Id is  required!");
        }

        const card = await Cards.findOne({_id: id});


        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        if (title) {
            card.title = title;
        }

        if (price) {
            card.price = price;
        }
        if (cardType) {
            card.cardType = cardType;
        }

        await card.save();
        return success_response(res, 200, "Card successfully updated", card);
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

        const card = await Cards.findOne({uuid: id});

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

        const card = await Cards.findOne({uuid: id});

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

        const card = await Cards.findOne({uuid: id});

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

        const card = await Cards.findOne({uuid: id});

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

        const card = await Cards.findOne({uuid: id});

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
        const uuid = req.params.uuid;

        if (!uuid) {
            return error_response(res, 400, "Id is required!");
        }

        const card = await Cards.findOne({uuid: uuid});


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

exports.getAllFrontDesignCards = async (req, res) => {
    try {
        const allCards = await Cards.find({
            frontDesign: {$ne: null},
            backDesign: {$ne: null},
            insideLeftDesign: {$ne: null},
            insideRightDesign: {$ne: null}
        }).sort({createdAt: -1});
        return success_response(res, 200, "All front design card fetch successfully", allCards);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};

exports.getCardForGame = async (req, res) => {
    try {

        const {uuid} = req.params;

        if (!uuid) {
            return error_response(res, 400, "Id is required!");
        }

        const card = await Cards.findOne({uuid});

        if (!card) {
            return error_response(res, 400, "Card not found!");
        }

        const data = {
            ...card._doc,
            frontDesign: card?.frontDesign ? `${API_URL}/${card?.frontDesign?.replace(/\\/g, "/")}` : null,
            backDesign: card?.backDesign ? `${API_URL}/${card?.backDesign?.replace(/\\/g, "/")}` : null,
            insideLeftDesign: card?.insideLeftDesign ? `${API_URL}/${card?.insideLeftDesign?.replace(/\\/g, "/")}` : null,
            insideRightDesign: card?.insideRightDesign ? `${API_URL}/${card?.insideRightDesign?.replace(/\\/g, "/")}` : null,
            video: card?.video ? `${API_URL}/${card?.video?.replace(/\\/g, "/")}` : null
        };
        return success_response(res, 200, "Card get successfully", data);
    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};


exports.uploadARTemplateData = async (req, res) => {
    try {
        let {
            userId,
            arTemplateData,
        } = req.body;

        if (!userId) {
            return error_response(res, 400, "User id is required!");
        }

        const templateData = await TemplateData.findOne({userId});

        if (templateData) {
            const customize = await CardsCustomization.create({
                userId,
                cardId: templateData.cardId,
                arTemplateData: templateData.arTemplateData,
                templateImage0: templateData?.templateImage0 ?? null,
                templateImage1: templateData?.templateImage1 ?? null,
                templateImage2: templateData?.templateImage2 ?? null,
                templateImage3: templateData?.templateImage3 ?? null,
                templateImage4: templateData?.templateImage4 ?? null,
                templateImage5: templateData?.templateImage5 ?? null,
                templateImage6: templateData?.templateImage6 ?? null,
                templateImage7: templateData?.templateImage7 ?? null,
                templateImage8: templateData?.templateImage8 ?? null,
                templateImage9: templateData?.templateImage9 ?? null,
                templateVideo: templateData?.templateVideo ?? null
            });

            // Delete the templateData entry after successful customization creation
            await TemplateData.deleteOne({userId});

            return success_response(res, 200, "AR template data saved and template deleted successfully", customize);
        }
        return error_response(res, 404, "No template data found for the user");


    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};
// when click on card template create and than upload image one by one and video

exports.uploadARTemplate = async (req, res) => {
    try {
        let {uuid} = req.body;

        if (!uuid) {
            return error_response(res, 400, "Card UUID is required!");
        }

        const card = await Cards.findOne({uuid});

        if (!card) {
            return error_response(res, 404, "Card not found!");
        }

        // Create new template
        const template = await TemplateData.create({
            userId: uuidv4(),
            cardId: card._id
        });

        return success_response(res, 200, "Template created successfully", template);

    } catch (error) {
        console.log(error);
        return error_response(res, 500, error.message);
    }
};

exports.uploadTemplateImage = async (req, res) => {
    try {
        const {userId, index} = req.body;

        if (!userId || index === undefined) {
            return error_response(res, 400, "Both user id  and index are required!");
        }
        const card = await TemplateData.findOne({userId});


        if (!card) {
            return error_response(res, 404, "Template data  not found!");
        }

        if (req.file) {
            const imagePath = req.file.path.substring(7); // remove "public/" if that's the path prefix
            const fieldName = `templateImage${parseInt(index)}`; // e.g., index=0 → templateImage1

            card[fieldName] = imagePath; // 👈 dynamic field update
            await card.save();


            return success_response(res, 200, `Image uploaded successfully at ${fieldName}`, {
                [fieldName]: imagePath,
                index: parseInt(index),
                url: `${BACKEND_URL}/${imagePath}?index=${index}`,
                card
            });

        }

        return error_response(res, 400, "No file uploaded.");
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};

exports.uploadVideoForTemplate = async (req, res) => {
    try {
        const {userId} = req.body;

        if (!userId) {
            return error_response(res, 400, "User id  is  required!");
        }

        const card = await TemplateData.findOne({userId});

        if (!card) {
            return error_response(res, 404, "Template data  not found!");
        }

        if (req.file) {
            const videoPath = req.file.path.substring(7);

            card.templateVideo = videoPath;
            await card.save();


            return success_response(res, 200, `Video uploaded successfully`, {
                video: videoPath,
                url: `${BACKEND_URL}/${videoPath}`,
                card
            });
        }
        return error_response(res, 400, "No file uploaded.");
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};
exports.uploadArTemplateJson = async (req, res) => {
    try {
        const {userId, data} = req.body;

        if (!(userId && data)) {
            return error_response(res, 400, "All inputs are required!");
        }
        const card = await TemplateData.findOne({userId});


        if (!card) {
            return error_response(res, 404, "Template data  not found!");
        }
        card.arTemplateData = data;
        await card.save();

        return success_response(res, 200, "Json save  successfully", card);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};


exports.getTemplateData = async (req, res) => {
    try {
        const {userId} = req.params;

        if (!userId) {
            return error_response(res, 400, "User id is  required!");
        }

        const card = await TemplateData.findOne({userId});

        if (!card) {
            return error_response(res, 404, "Template data  not found!");
        }

        return success_response(res, 200, "Template data fetch successfully", card);
    } catch (error) {
        console.error(error);
        return error_response(res, 500, error.message);
    }
};