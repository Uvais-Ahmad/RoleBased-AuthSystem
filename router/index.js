const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/middleware');

const userCont = require('../controller/userController');

router.get('/',authenticateToken,userCont.home);


//for render the logIn page
router.get('/logIn',userCont.login);

// For creting user in DB & For logIn createSession
router.post('/create',userCont.register);
router.post('/create-session',userCont.createSession)

router.get('/logout',userCont.logOut);


router.use('/admin',require('./admin'));
router.use('/user',require('./user'));

module.exports = router;