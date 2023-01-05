const express = require('express');
const router = express.Router();

const userCont = require('../controller/userController');


//Used to render the page
router.get('/signup',userCont.signUp);
router.get('/logIn',userCont.login);

router.post('/create',userCont.register);


router.use('/admin',require('./admin'));
router.use('/user',require('./user'));

module.exports = router;