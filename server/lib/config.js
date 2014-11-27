'use strict';

var convict = require('convict');
var fs = require('fs');

var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS'
  },
  port: {
    doc: 'The port to bind to.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  db: {
    doc: 'A MongoDB connection string.',
    format: String,
    default: 'mongodb://localhost/graff_dev',
    env: 'MONGOHQ_URL'
  },
  logLevel: {
    doc: 'What level for the logs.',
    format: ['none', 'debug', 'info', 'warn', 'error'],
    default: 'info'
  }
});

if (fs.existsSync('./config/' + config.get('env') + '.json')) {
  config.loadFile('./config/' + config.get('env') + '.json');
}

config.validate();

module.exports = config;
