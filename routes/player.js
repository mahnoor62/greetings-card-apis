const express = require('express');
const router = express.Router();
const middleWare = require('../middleware/auth');
const {create_player, update_score, get_Leader_board} = require('../controllers/player');

router.post('/create-player', middleWare, create_player);
router.post('/update-score', middleWare, update_score);
router.get('/leader-board/:slug', middleWare,get_Leader_board);

module.exports = router;