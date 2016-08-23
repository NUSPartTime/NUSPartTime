var express = require('express');
var models  = require('../models');
var router = express.Router();

/* GET company page. */
router.get('/', function(req, res){
  res.render('company');
});

router.get('/new_company', function(req, res, next) {
  res.render('new_company', { title: 'Ready to Hire?' });
});

router.post('/new_company', function(req, res){
  models.Company.create({
    name: req.body.name,
    phone: req.body.contact,
    email: req.body.email
  }).then(function(){
    res.redirect('/company');
  });
});

router.get('/new_job', function(req, res){
  res.render('post_job');
});

router.post('/new_job', function(req, res){
  models.Job.create({
    title: req.body.title,
    status: req.body.status,
    salary: req.body.salary,
    description: req.body.description,
    applicationDeadline: req.body.application_deadline,
    deadline: req.body.deadline
  }).then(function(){
    res.redirect('/company');
  });
});



module.exports = router;
