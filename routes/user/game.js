const express = require('express');
const router = express.Router();
const middleWare = require('../../middleware/auth');
const {get_all_games} = require('../../controllers/user/game');


router.get('/all', middleWare, get_all_games);


module.exports = router;