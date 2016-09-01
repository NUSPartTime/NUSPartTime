var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET all jobs stored in the DB */
router.get("/allJobs", function(req, res) {
    models.sequelize.Promise.all([
        models.Category.findAll(),
        models.Job.findAll({
            include: [models.JobCategory]
        })
    ]).spread(function(allCategories, allJobs) {
        var catJobArray = [];
        for (var category of allCategories) {
            var jobs = [];
            for (var job of allJobs) {
                if (job.JobCategories[0].categoryId == category.id) {
                    jobs.push(job);
                }
            }
            catJobArray.push({
                category: category.name,
                categoryHtmlClass: category.name.replace(/ /g, ""),
                jobs: jobs
            });
        }
        console.log(catJobArray);

        res.send({
            catJobArray: JSON.stringify(catJobArray)
        })
    });
});


/* GET job with certain ID */
router.get("/getJob/:jobId/user/:userId", function(req, res) {
    console.log(req.params);
    models.sequelize.Promise.all([
        models.StudentJob.findAll({
            where: {
                jobId: req.params.jobId,
                studentId: req.params.userId,
            }
        }),
        models.Job.findAll({
            where: {
                id: req.params.jobId
            },
            include: [models.Company]
        })
    ]).spread(function(allStudentJobs, allJobs) {
        if (typeof(allJobs[0]) != "undefined") {
            var job = allJobs[0];
        } else {
            res.send({
                status: "error"
            });
        }

        if (typeof(allStudentJobs[0]) != "undefined") {
            var applicationStatus = allStudentJobs[0].status;
        } else {
            var applicationStatus = -1;
        }

        res.send({
            job: job,
            applicationStatus: applicationStatus
        });
    });
});


/* POST student job application */
// TODO: improve implementation (current implementation is flawed, but let's leave it this way first...)
router.post("/applyJob", function(req, res) {
    var jobId = req.body.jobId;
    var userId = req.body.userId;
    if (!jobId || !userId) {
        res.send({
            status: "error",
            error: "Job ID or User ID not specified!"
        });
    } else {
        console.log("user: " + userId + "  applying for job: " + jobId);
        models.sequelize.Promise.all([
            models.Job.findAll({
                where: {
                    id: jobId
                },
            }),
            models.CompanyContact.findAll()
        ]).spread(function(allJobs, allCompanyContacts) {
            if (typeof(allJobs[0]) != "undefined") {
                var job = allJobs[0];
                var userId = null;
                for (var companyContact of allCompanyContacts) {
                    if (companyContact.companyId == job.companyId) {
                        userId = companyContact.employerId;
                        break;
                    }
                }
                if (typeof(userId) != "undefined") {
                    var message = "There's a new application for " + job.title;
                    models.Notification.create({
                        userId: userId,
                        jobId: jobId,
                        status: 0,
                        message: message
                    });
                }
            }
        });
        models.StudentJob.create({
            jobId: jobId,
            studentId: userId,
            status: 1
        }).then(function() {
            res.send({
                status: "success",
                applicationStatus: 1
            });
        });
    }
});


/* POST student job application cancel */
router.post("/cancelJob", function(req, res) {
    var jobId = req.body.jobId;
    var userId = req.body.userId;
    if (!jobId || !userId) {
        res.send({
            status: "error",
            error: "Job ID or User ID not specified!"
        });
    } else {
        console.log("user: " + userId + "  cancel job application for: " + jobId);
        models.StudentJob.update({
            status: 0
        }, {
            where: {
                jobId: jobId,
                studentId: userId
            }
        }).then(function() {
            res.send({
                status: "success",
                applicationStatus: 0
            });
        });
    }
});


/* POST student job re-application */
router.post('/reapplyJob', function(req, res) {
    var jobId = req.body.jobId;
    var userId = req.body.userId;
    if (!jobId || !userId) {
        res.send({
            status: "error",
            error: "Job ID or User ID not specified!"
        });
    } else {
        console.log("user: " + userId + "  reapply for job: " + jobId);
        models.StudentJob.update({
            status: 1
        }, {
            where: {
                jobId: jobId,
                studentId: userId
            }
        }).then(function() {
            res.send({
                status: "success",
                applicationStatus: 1
            });
        });
    }
});

/*POST job creation form*/
router.post('/getJobApplicationForm', function(req, res) {
    var userId = req.body.userId;
    var companies = {};
    var categories = {};
    models.sequelize.Promise.all([
        models.CompanyContact.findAll({
            where: {
                employerId: userId
            }
        }),
        models.Company.findAll(),
        models.Category.findAll()
    ]).spread(function(allCompanyContact, allCompany, allCategories) {
        if (allCompanyContact == null) {
            console.log('company does not exist');
        } else {

            for (var contact of allCompanyContact) {
                for (var company of allCompany) {
                    if (company.id == contact.companyId) {
                        companies[company.id] = company.name;
                    }
                }
            }

            for (var category of allCategories) {
                categories[category.id] = category.name;
            }

        }
        res.send({
            companies: companies,
            categories: categories
        });
    });
});

router.post("/createJob", function(req, res) {
    var Job = models.Job;
    models.JobCategory.create({
        Job: {
            companyId: req.body.companyId,
            title: req.body.title,
            status: req.body.status,
            salary: req.body.salary,
            description: req.body.description,
            applicationDeadline: req.body.applicationDeadline,
            deadline: req.body.deadline
        },
        categoryId: req.body.categoryId

    }, {
        include: [models.Job]
    }).then(function() {
        res.send({
            redirect: "/company"
        });
    });
});

router.post('/updateJob', function(req, res){
    models.sequelize.Promise.all([
        models.Job.findAll({
            where: {
                id: req.body.id
            },
        }),
        models.StudentJob.findAll({
            where: {
                jobId: req.params.job_id    
            }
        })
    ]).spread(function(allJobs, all_studentJobs) {
        console.log(req.body);
        if(typeof(allJobs[0]) != "undefined") {
            job = allJobs[0];

            if (typeof(req.body.status)!= "undefined") {
                var message = "";
                if (req.body.status == 0) {
                    message = 'The job "' + job.title + '"" you applied for has been closed.';
                }
                for(var studentJob of all_studentJobs) {
                    models.Notification.create({
                        userId: studentJob.studentId,
                        jobId: req.params.job_id,
                        status: 0,
                        message: message
                    });
                }
            }

            job.update({
                companyId: req.body.companyId,
                title: req.body.title,
                status: req.body.status,
                salary: req.body.salary,
                description: req.body.description,
                applicationDeadline: req.body.applicationDeadline,
                deadline: req.body.deadline
            }).then(function(){
                res.send({
                    redirect: "/company"
                });
            });
        }
    });
});

            // /* This is for company to view job status */
            // router.get('/:job_id/view', function(req, res, next) {
            //   var sess = req.session;

            //   if(!sess.is_employer){
            //     res.redirect('../'+req.params.job_id+'/details');
            //   }

            //   var userId = sess.user_id;
            //   models.sequelize.Promise.all([
            //     models.StudentJob.findAll({
            //       where: {

            //         // Use job id to find the join tables.
            //         jobId: req.params.job_id
            //       },
            //       include: [models.Student]
            //     }),
            //     models.Job.findAll({
            //       where: {

            //         // Also use job id to find the particular job
            //         id: req.params.job_id
            //       },
            //       include: [models.Company]
            //     }),
            //     models.CompanyContact.findAll({
            //       where: {
            //         employerId: userId
            //       },
            //       include: [models.Company]
            //     }),

            //   ]).spread(function(all_studentJobs, all_jobs, allCompanyContacts) {

            //     if (typeof(all_jobs[0]) != "undefined") {
            //       var job = all_jobs[0];
            //       var all_students = [];
            //       var companies = [];
            //       for(var studentJob of all_studentJobs) {
            //         if(studentJob.status !== 0) {
            //           all_students.push(studentJob.Student);
            //         }
            //       }

            //       // fetch all companies
            //       for(var companyContact of allCompanyContacts) {
            //         var company = companyContact.Company;
            //         companies[company.id] = company.name;
            //       }

            //       res.render('edit_job', {
            //         job: job,
            //         students: all_students,
            //         title: "Applicants",
            //         companies: companies
            //       });
            //     } else {
            //       res.render('user_error', {
            //         message: "The job requested doesn't exist."
            //       });
            //     }

            //     // we create an array to store all the students who have successfully apppied for this job

            //   });
            // });

            // /* This is for companies to update a job */
            // router.post('/:job_id/edit', function(req, res) {
            //   var sess = req.session;
            //   models.sequelize.Promise.all([
            //     models.Job.findAll({
            //       where: {
            //         // Also use job id to find the particular job
            //         id: req.params.job_id
            //       },
            //     })
            //   ]).spread(function(all_jobs) {
            //     if(typeof(all_jobs[0]) != "undefined") {
            //       job = all_jobs[0];
            //       job.update({
            //         companyId: req.body.companyId,
            //         title: req.body.title,
            //         status: req.body.status,
            //         salary: req.body.salary,
            //         description: req.body.description,
            //         applicationDeadline: req.body.application_deadline,
            //         deadline: req.body.deadline
            //       }).then(function(){
            //         res.redirect('/jobs/' + req.params.job_id + '/view');
            //       });
            //     }
            //   });
            // });

            module.exports = router;
