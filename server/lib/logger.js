'use strict';

var fs = require('fs');
var config = require('./config');

module.exports = {
  getLogFormat: function() {
    return config.get('logFormat');
  },
  getLogOptions: function() {
    var options = {};
    if (config.get('logStream') !== 'process.stdout') {
      options.stream = fs.createWriteStream('./logs/' + config.get('logStream'), {flags: 'a'});
    }
    return options;
  }
};
