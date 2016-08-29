var models  = require('../models');
var express = require('express');
var router = express.Router();

router.post('/login', function(req, res) {
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
			res.send({error: "User Id not specified!"});
		} else {
			if (student != null) {
				if (employer != null) {
					// role as both student and employer, stay at main page and let user select?
					res.send({
						isStudent: true,
						isEmployer: true,
						redirect: "/"
					});
				} else {
					res.send({
						isStudent: true,
						isEmployer: false,
						redirect: "/student"
					});
				}
			} else if (employer != null) {
				res.send({
					isStudent: false,
					isEmployer: true,
					redirect: "/company"
				});
			} else {
				res.send({
					isStudent: false,
					isEmployer: false,
					redirect: "/"
				});
			}
		}
	});
});







router.get('/new_student', function(req, res, next) {
  res.render('student_register', { title: 'Student Validation',
                                   header: 'NUS Student Validation' });
});

router.post('/new_student/create', function(req, res) {
  var user_id = req.session.user_id;
  var matric_number = req.body.matric_number;

  models.Student.create({
    id: user_id,
    matric: matric_number
  }).then(function() {
    console.log("Student created successfully");
    req.session.user_id = user_id;
    res.redirect('/student');
  });
});

/* POST user creation. */
router.post('/create_user', function(req, res) {
  var user_id = req.body.id;
  models.sequelize.Promise.all([
    models.User.findOne({
      where: {
        id: user_id
      }
    }),
    models.Student.findOne({
      where: {
        id: user_id
      }
    }),
    models.Employer.findOne({
      where: {
        id: user_id
      }
    })
  ]).spread(function(user, student, employer) {
    if (user == null) {
      // create new user
      models.User.create({
        id: req.body.id,
        name: req.body.name
      }).then(function() {
        console.log("user created successfully");
        req.session.user_id = user_id;
      });
    } else {
      console.log("user logged in!");
      req.session.user_id = user_id;
      req.session.is_student = false;
      req.session.is_employer = false;
      if (student != null) {
        // store session key and redirect to student page
        req.session.is_student = true;
        if (employer != null) {
          req.session.is_employer = true;
        }
        res.send({redirect: '/student'});
      } else if (employer != null) {
        // direct to company page
        req.session.user_id = user_id;
        req.session.is_employer = true;
        res.send({redirect: '/company'});
        /*
          stub
        */
      } else {
        // user has not register as student or emplyer
        req.session.user_id = user_id;
        res.send({redirect: '/'});
      }
    }
  });
});

router.post('/logout', function(req, res) {
  console.log("destroying the session key to log user out");
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("session key destroyed");
    }
  });
});

router.post('/create_student', function(req, res) {
  console.log("Creating student with id : " + req.body.id);
  res.send({redirect: '/student'});
});

router.post('/create_company', function(req, res) {
  console.log("Creating company");
  /*
    Stub
  */
  res.send({redirect: '/company'});
});

/* GET user destroyed. */
router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
