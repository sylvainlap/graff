'use strict';

var express = require('express');

var router = express.Router()

router.route('/').get(function(req, res) {
  res.status(200).send('C\'est ici qu\'on va se logger pour poster des messages');
});

module.exports = router;
