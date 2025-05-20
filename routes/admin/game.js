const express = require('express');
const router = express.Router();
const middleWare = require('../../middleware/admin');
const {get_all_games} = require('../../controllers/admin/game');


router.get('/get-all-games', middleWare, get_all_games);


module.exports = router;