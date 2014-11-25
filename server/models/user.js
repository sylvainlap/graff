'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('User', UserSchema);
