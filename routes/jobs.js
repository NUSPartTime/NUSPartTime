var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET job with certain ID */
router.get('/:job_id/details', function(req, res) {
  var sess = req.session;
  models.sequelize.Promise.all([
    models.StudentJob.findAll({
      where: {
        jobId: req.params.job_id,
        studentId: sess.user_id,
      }
    }),
    models.Job.findAll({
      where: {
        id: req.params.job_id
      },
      include: [models.Company]
    })
  ]).spread(function(all_studentJobs, all_jobs) {
    if (typeof(all_jobs[0]) != "undefined") {
      var job = all_jobs[0];
    } else {
      res.render('user_error', {
        message: "The job requested doesn't exist."
      });
    }

    if (typeof(all_studentJobs[0]) != "undefined") {
      var applicationStatus = all_studentJobs[0].status;
    } else {
      var applicationStatus = -1;
    }

    console.log(job.id);
    console.log(applicationStatus);
    var identity = (req.session.is_employer) ? 'employer' : 'student';
    res.render('job', {
      identity: identity,
      job: job,
      applicationStatus: applicationStatus
    });
  });
});

/* This is for company to view job status */
router.get('/:job_id/view', function(req, res, next) {
  var sess = req.session;
  var userId = sess.user_id;
  models.sequelize.Promise.all([
    models.StudentJob.findAll({
      where: {

        // Use job id to find the join tables.
        jobId: req.params.job_id
      },
      include: [models.Student]
    }),
    models.Job.findAll({
      where: {

        // Also use job id to find the particular job
        id: req.params.job_id
      },
      include: [models.Company]
    }),
    models.CompanyContact.findAll({
      where: {
        employerId: userId
      },
      include: [models.Company]
    }),

  ]).spread(function(all_studentJobs, all_jobs, all_companyContacts) {

    if (typeof(all_jobs[0]) != "undefined") {
      var job = all_jobs[0];
      var all_students = [];
      var companies = [];
      for(var studentJob of all_studentJobs) {
        if(studentJob.status !== 0) {
          all_students.push(studentJob.Student);
        }
      }

      // fetch all companies
      for(var companyContact of all_companyContacts) {
        var company = companyContact.Company;
        companies[company.id] = company.name;
      }

      res.render('edit_job', {
        job: job,
        students: all_students,
        title: "Applicants",
        companies: companies
      });
    } else {
      res.render('user_error', {
        message: "The job requested doesn't exist."
      });
    }

    // we create an array to store all the students who have successfully apppied for this job

  });
});

/* This is for companies to update a job */
router.post('/:job_id/edit', function(req, res) {
  var sess = req.session;
  models.sequelize.Promise.all([
    models.Job.findAll({
      where: {

        // Also use job id to find the particular job
        id: req.params.job_id
      },
    })
  ]).spread(function(all_jobs) {
    if(typeof(all_jobs[0]) != "undefined") {
      job = all_jobs[0];
      job.update({
        companyId: req.body.companyId,
        title: req.body.title,
        status: req.body.status,
        salary: req.body.salary,
        description: req.body.description,
        applicationDeadline: req.body.application_deadline,
        deadline: req.body.deadline
      }).then(function(){
        res.redirect('/jobs/' + req.params.job_id + '/view');
      });
    }
  });
});

/* POST student job application */
router.post('/:job_id/apply', function(req, res) {
  var sess = req.session;
  models.sequelize.Promise.all([
    models.Job.findAll({
      where: {
        id: req.params.job_id
      },
    }),
    models.CompanyContact.findAll()
  ]).spread(function(all_jobs, all_companyContacts) {
    if(typeof(all_jobs[0]) != "undefined") {
      var job = all_jobs[0];
      var userId = null;
      for(var companyContact of all_companyContacts) {
        if (companyContact.companyId == job.companyId) {
          userId = companyContact.employerId;
          break;
        }
      }
      if (typeof(userId) != "undefined") {
        models.Notification.create({
          userId: userId,
          jobId: req.params.job_id,
          status: 0,
          message: "There's a new application."
        });
      }
    }
  });
  
  models.StudentJob.create({
    jobId: req.params.job_id,
    studentId: sess.user_id,
    status: 1
  }).then(function(){
    res.redirect('/jobs/' + req.params.job_id + '/details');
  });
});

/* POST student job application cancel */
router.post('/:job_id/cancel', function(req, res){
  var sess = req.session;
  models.StudentJob.update({
    status: 0
  },{
    where: {
      jobId: req.params.job_id,
      studentId: sess.user_id,
    }
  }).then(function(){
    res.redirect('/jobs/' + req.params.job_id + '/details');
  });
});

/* POST student job re-application */
router.post('/:job_id/reapply', function(req, res){
  var sess = req.session;
  models.StudentJob.update({
    status: 1
  },{
    where: {
      jobId: req.params.job_id,
      studentId: sess.user_id
    }
  }).then(function(){
    res.redirect('/jobs/' + req.params.job_id + '/details');
  });
});

module.exports = router;
