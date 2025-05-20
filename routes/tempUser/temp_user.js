const express = require('express');
const router = express.Router();
const {uploadMiddleware, uploadMusicFile} = require('../../utils/multer');
const {
    create_temp_user,
    upload_bgImage,
    upload_logoImage,
    update_button_color,
    update_title,
    update_background_color,
    upload_bgMusic,
    get_user_customization
} = require('../../controllers/tempuser/temp_user');


router.get('/create/:slug', create_temp_user);
router.post('/upload-bgImage', uploadMiddleware('temp_user').single('backgroundImage'), upload_bgImage);
router.post('/upload-logoImage', uploadMiddleware('temp_user').single('logoImage'), upload_logoImage);
router.post('/update-button', update_button_color);
router.post('/update-title', update_title);
router.post('/update-background-color', update_background_color);
router.post('/upload-bgMusic', uploadMiddleware('temp_user').single('bgMusic'), upload_bgMusic);
router.post('/user-customization', get_user_customization);
module.exports = router;