// const express = require('express');
// const router = express.Router();
// const middleWare = require('../../middleware/auth');
// const {uploadMiddleware, uploadMusicFile} = require('../../utils/multer');
// const {
//     update_background_image,
//     logo_image,
//     update_title,
//     update_button_code,
//     update_background_code,
//     get_user_customization,
//     get_user_paid_games,
//     bg_music
// } = require('../../controllers/user/game_customization');
//
// router.post('/update-background-image', [middleWare, uploadMiddleware('game').single('backgroundImage')], update_background_image);
// router.post('/update-logo-image', [middleWare, uploadMiddleware('game').single('logoImage')], logo_image);
// router.post('/update-bg-music', [middleWare, uploadMusicFile('music').single('bgMusic')], bg_music);
// router.post('/update-title', middleWare, update_title);
// router.post('/update-button-color', middleWare, update_button_code);
// router.post('/update-background-color', middleWare, update_background_code);
// router.get('/user-customization/:slug', middleWare, get_user_customization);
// router.get('/user-paid-games', middleWare, get_user_paid_games);
// module.exports = router;