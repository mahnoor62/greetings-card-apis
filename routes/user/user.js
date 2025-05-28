const express = require('express');
const router = express.Router();

const {
    register,
    verify,
    login,
    auth,
    forget,
    reset,
    verification_email,
} = require('../../controllers/user/user');
const middleWare = require('../../middleware/auth');

router.post('/register', register);
router.post('/verify', verify);
router.post('/login', login);
router.get('/auth', middleWare, auth);
// router.post('/forget', forget);
// router.post('/reset', reset);
router.post('/verification-email', middleWare, verification_email);

module.exports = router;