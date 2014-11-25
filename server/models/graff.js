'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GraffSchema = new Schema({
  _user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    trim: true,
    default: ''
  },
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Graff', GraffSchema);
