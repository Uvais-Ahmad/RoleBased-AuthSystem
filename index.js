const express = require('express');
const app = express();
const port = 8000;
const dotenv = require('dotenv').config();
const db = require('./config/mongoose');
const path = require('path');
const expressLayout = require('express-ejs-layouts');

app.use(express.urlencoded({extended:true}));

// Ejs setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// Express Ejs layouts setup
app.use(expressLayout);

app.set('layouts extractStyles',true);
app.set("layouts extractScripts", true)

app.use('/',require('./router'));
app.listen(port , (err)=>{
    if(err){
        console.log(`Error while running the server on Port : ${port}`);
    }
    console.log(`Server running on Port ${port}`);
})