const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const dotenv = require('dotenv').config();
const db = require('./config/mongoose');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportJwt = require('./config/passport-jwt');
const cookieParser = require('cookie-parser');
const logger = require('./logger');

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

// Ejs setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('assets'));

// Express Ejs layouts setup
app.use(expressLayout);

app.set('layout extractStyles',true);
app.set("layout extractScripts", true)


app.use(passport.initialize());

app.use('/',require('./router'));
app.listen(port , (err)=>{
    if(err){
        // console.log(`Error while running the server on Port : ${port}`);
        logger.error(`Error while running the server on Port : ${port}`);
    }
    // console.log(`Server running on Port ${port}`);
    logger.info(`Server running on Port ${port}`);
})