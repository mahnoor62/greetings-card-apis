const express = require('express');
const router = express.Router();
const middleWare = require('../../middleware/admin');

const {create_transaction, get_all_transaction, approved_status} = require('../../controllers/admin/transaction');
//transaction for user
router.post('/create-transaction', middleWare, create_transaction);
//transaction for admin
router.get('/get-all-transaction', middleWare, get_all_transaction);
router.get('/approved-status/:id', middleWare, approved_status);


module.exports = router;