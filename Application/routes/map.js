﻿'use strict';
var express = require('express');
var router = express.Router();

/* GET map page. */
router.get('/', function (req, res) {
    res.render('map', { title: 'Express' });
});

module.exports = router;