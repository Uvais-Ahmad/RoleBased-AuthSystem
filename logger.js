const { transport, transports } = require('winston');
const winston = require('winston');

const logger = winston.createLogger({
    level:'debug',
    transports : [
        new transports.Console(),
        new transports.File({filename : 'app.log'})
    ]
});

module.exports = logger;