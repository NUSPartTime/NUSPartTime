// var models  = require('../models');
var express = require('express');
var router = express.Router();

// exports.index = function(req, res) {
// 	res.render('index', {
//         title: 'NUS Part-time',
//         user_id: req.session.user_id,
//         is_student: req.session.is_student,
//         is_employer: req.session.is_employer
//     });
// };

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session);
    res.render('index', {
        title: 'NUS Part-time',
        user_id: req.session.user_id,
        is_student: req.session.is_student,
        is_employer: req.session.is_employer
    });
});

module.exports = router;
