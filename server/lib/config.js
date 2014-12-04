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
  logFormat: {
    doc: 'What format for the logs.',
    format: ['combined', 'common', 'dev', 'short', 'tiny'],
    default: 'dev'
  },
  logStream: {
    doc: 'Output stream for writing log lines',
    format: String,
    default: 'process.stdout'
  },
  sessionName: {
    doc: 'The name of session cookie',
    format: String,
    default: 'graff.sid'
  },
  sessionSecret: {
    doc: 'Session cookie is signed with this secret',
    format: String,
    default: 'MySuperS3cret'
  }
});

if (fs.existsSync('./config/' + config.get('env') + '.json')) {
  config.loadFile('./config/' + config.get('env') + '.json');
}

config.validate();

module.exports = config;
