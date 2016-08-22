var models  = require('../models');
var express = require('express');
var router = express.Router();

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
        res.redirect('/');
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
        res.redirect('/student');
      } else if (employer != null) {
        // direct to company page
        req.session.user_id = user_id;
        req.session.is_employer = true;
        /*
          stub
        */
      } else {
        // user has not register as student or emplyer
        req.session.user_id = user_id;
        res.redirect('/');
      }
    }
  });
});

router.post('/logout', function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

router.post('/create_student', function(req, res) {
  console.log("Creating student with id : " + req.body.id);
  res.redirect('/student');
});

router.post('/create_company', function(req, res) {
  res.redirect('/company');
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