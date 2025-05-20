const express = require('express');
const router = express.Router();

const {get_all_games} = require('../controllers/game');

router.get('/get-all-games', get_all_games);

module.exports = router;