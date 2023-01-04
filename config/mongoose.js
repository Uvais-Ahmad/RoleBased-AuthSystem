// const dotenv = require('dotenv').config();

const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL);
mongoose.connect('mongodb://localhost/RoleBased_Auth_Developer');
console.log("mongoose connection");
const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error occur while making mongoose connection"));

db.once('open',function(){
    console.log("Connection success to mongoose .");
});

module.exports = db;


// const mongoose = require("mongoose");
// const dotenv = require('dotenv').config();
// let mongo_Url = process.env.MONGODB_URL;

// module.exports = mongoose.connect(mongo_Url , { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("Connection established"));