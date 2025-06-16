const express = require('express');
const router = express.Router();
const {
    createCard,
    getAllCards,
    uploadFrontDesign,
    uploadBackDesign,
    uploadInsideLeftDesign,
    uploadInsideRightDesign,
    uploadVideo, getAllFrontDesignCards, getCardForGame,
    getCard, destroyCard, uploadARTemplateData, EditCard, uploadARTemplate, uploadTemplateImage, uploadVideoForTemplate,getTemplateData,
} = require('../../controllers/admin/cardCustomization');
const {uploadMiddleware, uploadMusicFile} = require('../../utils/multer');
const middleWare = require("../../middleware/admin");


router.post('/create', middleWare, createCard);
router.get('/get/user/:userId', getTemplateData);
router.post('/edit', middleWare, EditCard);
router.post('/upload-template-data', uploadARTemplateData);
router.post('/upload-card-id', uploadARTemplate);
router.post('/upload-image', uploadMiddleware('templateImages').single('image'), uploadTemplateImage);
router.post('/upload-template-video', uploadMiddleware('templateVideo').single('video'), uploadVideoForTemplate);
router.get('/get-all', middleWare, getAllCards);
router.get('/get-all-front-design', getAllFrontDesignCards);
router.get('/get/:uuid', middleWare, getCard);
router.get('/get/data/game/:uuid', getCardForGame);
router.delete('/destroy/:id', middleWare, destroyCard);
router.post('/upload-front-design', [middleWare, uploadMiddleware('Cards').single('frontDesign')], uploadFrontDesign);
router.post('/upload-back-design', [middleWare, uploadMiddleware('Cards').single('backDesign')], uploadBackDesign);
router.post('/upload-inside-left-design', [middleWare, uploadMiddleware('Cards').single('insideLeftDesign')], uploadInsideLeftDesign);
router.post('/upload-inside-right-design', [middleWare, uploadMiddleware('Cards').single('insideRightDesign')], uploadInsideRightDesign);
router.post('/upload-video-design', [middleWare, uploadMiddleware('Cards').single('video')], uploadVideo);


module.exports = router;