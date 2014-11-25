'use strict';

var express = require('express');

var router = express.Router()

router.route('/toto').get(function(req, res) {
  res.status(200).end();
});

module.exports = router;
