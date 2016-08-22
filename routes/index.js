var models  = require('../models');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.user_id) {
		// logged in but haven't chosen student or company yet
		console.log("req.session.user_id");
	} else {
		// not logged in yet
	}
    res.render('index', {
        title: 'NUS Part-time'
    });
});

module.exports = router;
