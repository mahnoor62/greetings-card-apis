const express = require('express');
const router = express.Router();
const middleWare = require("../../middleware/admin");
const {update_acc_details,get_acc_details, delete_acc_details} = require('../../controllers/admin/bank');

router.post('/create-details', middleWare, update_acc_details);
router.get('/get-details', middleWare, get_acc_details);


module.exports = router;