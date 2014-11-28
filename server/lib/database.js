'use strict';

var mongoose = require('mongoose');
var config = require('./config');

var db = mongoose.connect(config.get('db'), function(err) {
  if (err) {
    console.error('Could not connect to MongoDB at ' + config.get('db') + '.');
    process.exit();
  }
});

module.exports = db;
