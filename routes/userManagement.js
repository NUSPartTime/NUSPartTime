var models  = require("../models");
var express = require("express");
var router = express.Router();

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
