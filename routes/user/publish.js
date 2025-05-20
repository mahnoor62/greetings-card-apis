const express = require('express');
const router = express.Router();
const middleWare = require('../../middleware/auth');
const {publish_game} = require('../../controllers/user/publish');


router.get('/published/:slug', middleWare, publish_game);


module.exports = router;