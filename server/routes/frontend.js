'use strict';

var express = require('express');

var router = express.Router();

router.route('/').get(function(req, res) {
  res.render('index', { user: req.user || null });
});

module.exports = router;
