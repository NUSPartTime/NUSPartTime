var models  = require('../models');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	var should_register = false;
	if (req.session.user_id) {
		// logged in but haven't chosen student or company yet
		// ask user to choose
		should_register = true;
	} else {
		// not logged in yet
	}
    res.render('index', {
        title: 'NUS Part-time',
        show_register_window: should_register
    });
});

module.exports = router;
