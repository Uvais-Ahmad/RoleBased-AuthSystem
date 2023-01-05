const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/middleware');

const userCont = require('../controller/userController');

router.get('/',authenticateToken,userCont.home);

//Used to render the page || Only LoggedIn user can open SignUp if loggedin user is Admin
router.get('/signup',authenticateToken ,userCont.signUp);
router.get('/logIn',userCont.login);

// For creting user in DB & For logIn createSession
router.post('/create',userCont.register);
router.post('/create-session',userCont.createSession)

router.get('/logout',userCont.logOut);


router.use('/admin',require('./admin'));
router.use('/user',require('./user'));

module.exports = router;