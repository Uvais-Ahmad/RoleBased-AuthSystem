const express = require('express');
const router = express.Router();

const userCont = require('../controller/userController');
const authenticateToken = require('../config/middleware');

router.get('/dashboard',authenticateToken,userCont.dashboard);

module.exports = router;