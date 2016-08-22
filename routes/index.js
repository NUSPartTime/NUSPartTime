var models  = require('../models');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("session in index page : " + req.session);

	var should_register = false;
	console.log(req.session.user_id);
	if (req.session.user_id != undefined) {
		console.log("display registration");
		// logged in but haven't chosen student or company yet
		// ask user to choose
		should_register = true;
	} else {
		// not logged in yet
	}
    res.render('index', {
        title: 'NUS Part-time',
        show_register_window: should_register,
        user_id: req.session.user_id
    });
});

module.exports = router;
