'use strict';

var mongoose = require('mongoose');
var config = require('./config');
var logger = require('./logger');

var db = mongoose.connect(config.get('db'), function(err) {
  if (err) {
    logger.error('Could not connect to MongoDB at ' + config.get('db') + '.');
    process.exit();
  } else {
    logger.info('Connected to MongoDB at ' + config.get('db') + '.');
  }
});

module.exports = db;
