'use strict';

var winston = require('winston');
var config = require('./config');

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console(
      {
        colorize: true,
        level: config.get('logLevel')
      }
    ),
    new winston.transports.File(
      {
        filename: "graff." + config.get('env') + ".log",
        maxsize: 20000000,
        level: config.get('logLevel')
      }
    )
  ]
});

module.exports = logger;
