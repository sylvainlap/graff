'use strict';

var express = require('express');
var mongoose = require('mongoose');

var router = express.Router()

router.route('/').get(function(req, res) {
  res.status(200).send('C\'est ici qu\'on va se logger pour poster des messages');
});

router.route('/graffs').get(function(req, res) {
  res.status(200).send('C\'est ici qu\'on verra tous les messages');
})

module.exports = router;
