'use strict';

var express = require('express');

var router = express.Router();

require('./auth')(router);
require('./users')(router);
require('./graffs')(router);

module.exports = router;
