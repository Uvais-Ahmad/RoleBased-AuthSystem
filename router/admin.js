const express = require('express');
const router = express.Router();

const adminCont = require('../controller/adminController');

const authenticateToken = require('../config/middleware');

router.get('/signup',authenticateToken ,adminCont.signUp);

router.get('/biling',authenticateToken,adminCont.biling);

router.get('/allMember',authenticateToken,adminCont.allMember);

router.get('/deleteMember/:id',authenticateToken,adminCont.deleteMember);


module.exports = router;