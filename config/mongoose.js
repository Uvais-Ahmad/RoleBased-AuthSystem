

const mongoose = require("mongoose");
const logger = require("../logger");
mongoose.set("strictQuery", false);
const dotenv = require('dotenv').config();
var mongo_Url = process.env.MONGODB_URL;

module.exports = mongoose.connect(mongo_Url , { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>logger.info("Connection established"));