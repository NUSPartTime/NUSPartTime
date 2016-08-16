var express = require('express');
var models  = require('../models');
var router = express.Router();

/* GET company page. */
router.get('/', function(req, res, next) {
  res.render('company', { title: 'Ready to Hire?' });
});

router.post('/new_company', function(req, res){
  models.User.create({
    id: req.body.c_id,

  });

  models.Company.create({
    id: req.body.c_id,
    contact_person: req.body.contact,
    UserId: req.body.c_id
  }).then(function(){
    res.redirect('/company');
  });
});

router.post('/new_job', function(req, res){
  models.Job.create({
    id: req.body.job_id
  }).then(function(){
    res.redirect('/company');
  });
});



module.exports = router;
