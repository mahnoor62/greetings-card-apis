const express = require('express');
const router = express.Router();
const {login, verify, forget, reset, register} = require('../../controllers/admin/admin');
const middleWare = require("../../middleware/admin");


router.post('/login', login);
router.post('/register', register);
router.get('/auth', middleWare, verify);
router.post('/forget', forget);
router.post('/reset', reset);

module.exports = router;