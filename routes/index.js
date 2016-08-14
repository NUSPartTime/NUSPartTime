var models  = require('../models');
var express = require('express');
var FB = require("fb");
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'NUS Part-time'
    });
});

module.exports = router;
