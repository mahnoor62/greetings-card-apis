const express = require('express');
const router = express.Router();
const {update_password, update_email} = require('../../controllers/user/profile');
const middleWare = require('../../middleware/auth');

router.post('/update-password', middleWare, update_password);
router.post('/update-email', middleWare, update_email);

module.exports = router;