const express = require('express');
const router = express.Router();

const userCont = require('../controller/userController');

router.get('/',userCont.home);

module.exports = router;