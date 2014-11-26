'use strict';

var express = require('express');

var router = express.Router()

router.route('/').get(function(req, res) {
  res.status(200).send('C\'est ici qu\'on va administrer les graffs et les users, et qu\'on les montrera tous.');
});

module.exports = router;
