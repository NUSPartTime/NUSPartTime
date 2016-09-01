var models  = require("../models");
var express = require("express");
var querystring = require('querystring');
var https = require("https");
var router = express.Router();
var request = require('request');

router.post("/login", function(req, res) {
	var userId = req.body.userId;
	models.sequelize.Promise.all([
		models.User.findOne({
			where: {
				id: userId
			}
		}),
		models.Student.findOne({
			where: {
				id: userId
			}
		}),
		models.Employer.findOne({
			where: {
				id: userId
			}
		})
	]).spread(function(user, student, employer) {
		if (user == null) {
			res.send({
				error: "User Id not exist!",
				isRegistered: false
			});
		} else {
			if (student != null) {
				if (employer != null) {
					// role as both student and employer, stay at main page and let user select?
					res.send({
						isRegistered: true,
						isStudent: true,
						isEmployer: true,
						redirect: "/"
					});
				} else {
					res.send({
						isRegistered: true,
						isStudent: true,
						isEmployer: false,
						redirect: "/student"
					});
				}
			} else if (employer != null) {
				res.send({
					isRegistered: true,
					isStudent: false,
					isEmployer: true,
					redirect: "/company"
				});
			} else {
				res.send({
					isRegistered: true,
					isStudent: false,
					isEmployer: false,
					redirect: "/"
				});
			}
		}
	});
});


router.post("/authenticateStudent", function(req, res) {
	var matricNumber = req.body.matricNumber;
	var pwd = req.body.password;

	let originUrl = "https://myisis.nus.edu.sg";
	let agent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36";
	let refererUrl = "https://myisis.nus.edu.sg/psp/cs90prd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?cmd=login";
	var headers = {
	    "Origin": originUrl,
	    "Accept-Encoding": "gzip, deflate, br",
	    "Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6",
	    "User-Agent": agent,
	    "Content-Type": "application/x-www-form-urlencoded",
	    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
	    "Referer": refererUrl
	};

	let postUrl = "https://myisis.nus.edu.sg/psp/cs90prd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?cmd=login&languageCd=ENG";	
	var dataString = "userid=" + matricNumber + "&pwd=" + pwd;
	var options = {
	    url: postUrl,
	    method: "POST",
	    headers: headers,
	    body: dataString
	};

	function callback(error, response, body) {
		let presentUrl = "myisis.nus.edu.sg/psp/cs90prd/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP";
		let errorKey = "errorCode=105";
		if (body.indexOf(presentUrl) !== -1) {
			// contains url, check if username and pwd valid
			if (body.indexOf(errorKey) === -1) {
				res.send({
					status: true
				});
			} else {
				res.send({
					status: false
				});
			}
		} else {
			res.send({
				status: false
			});
		}
	}

	request(options, callback);
});


router.post("/createNewStudent", function(req, res) {
	var userId = req.body.userId;
	var matricNumber = req.body.matricNumber;
	models.Student.create({
		id: userId,
		matric: matricNumber
	}).then(function() {
		console.log("Student created with id: " + userId + " and matricNumber: " + matricNumber);
		res.send({
			redirect: "/student"
		});
	});
});


router.post("/createNewUser", function(req, res) {
	var userId = req.body.userId;
	models.sequelize.Promise.all([
		models.User.findOne({
			where: {
				id: userId
			}
		}),
		models.Student.findOne({
			where: {
				id: userId
			}
		}),
		models.Employer.findOne({
			where: {
				id: userId
			}
		})
	]).spread(function(user, student, employer) {
		if (user == null) {
			// create new user
			models.User.create({
				id: req.body.userId,
				name: req.body.name
			}).then(function() {
				console.log("User created successfully with id: " + userId);
				res.send({
					status: "success"
				});
			});
		} else {
			res.send({
				status: "error",
				error: "User already exist"
			});
		}
	});
});

router.post("/updateUserProfile", function(req, res){

		models.User.findOne({
			where: {
				id: req.body.id
			}
		}).then(function(user){
		if(typeof(user) != null){
			user.update({
				name: req.body.name,
				address: req.body.address,
				phone: req.body.phone,
				email: req.body.email,
				description: req.body.description
			}).then(function(){
				res.send({
					redirect: "/"
				});
			});
		}
	});
});

router.post("/getUserProfile", function(req, res){
	models.User.findOne({
		where: {
			id: req.body.id
		}
	}).then(function(user){
		res.send(user);
	});
})

// /* GET user destroyed. */
// router.get('/:user_id/destroy', function(req, res) {
//   models.User.destroy({
//     where: {
//       id: req.params.user_id
//     }
//   }).then(function() {
//     res.redirect('/');
//   });
// });

module.exports = router;
