const express = require('express');
const router = express.Router();
const {
    createCard,
    getAllCards,
    uploadFrontDesign,
    uploadBackDesign,
    uploadInsideLeftDesign,
    uploadInsideRightDesign,
    uploadVideo,
    getCard, destroyCard
} = require('../../controllers/admin/cardCustomization');
const {uploadMiddleware, uploadMusicFile} = require('../../utils/multer');
const middleWare = require("../../middleware/admin");


router.post('/create', middleWare, createCard);
router.get('/get-all', middleWare, getAllCards);
router.get('/get/:id', middleWare, getCard);
router.delete('/destroy/:id', middleWare, destroyCard);
router.post('/upload-front-design', [middleWare, uploadMiddleware('Cards').single('frontDesign')], uploadFrontDesign);
router.post('/upload-back-design', [middleWare, uploadMiddleware('Cards').single('backDesign')], uploadBackDesign);
router.post('/upload-inside-left-design', [middleWare, uploadMiddleware('Cards').single('insideLeftDesign')], uploadInsideLeftDesign);
router.post('/upload-inside-right-design', [middleWare, uploadMiddleware('Cards').single('insideRightDesign')], uploadInsideRightDesign);
router.post('/upload-video-design', [middleWare, uploadMiddleware('Cards').single('video')], uploadVideo);


module.exports = router;