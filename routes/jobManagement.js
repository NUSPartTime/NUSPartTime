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


/* POST to  */
router.post("/getJob", function(req, res) {
    var jobId = req.body.jobId;
    var userId = req.body.userId;
    models.sequelize.Promise.all([
        models.Job.findAll({
            where: {
                id: jobId
            }
        }),
        models.StudentJob.findAll({
            where: {
                jobId: jobId
            },
        }),
        models.CompanyContact.findAll({
            where: {
                employerId: userId
            }
        }),
        models.User.findOne({
            where: {
                id: userId
            }
        })
    ]).spread(function(allJobs, allStudentJobs, allCompanyContacts, user) {
        if (typeof(allJobs[0]) != "undefined") {
            var job = allJobs[0];
        } else {
            res.send({
                status: "error",
                error: "Job does not exists",
            });
        }

        var companyId = job.companyId;
        var isOwner = false;
        for (var companyContact of allCompanyContacts) {
            if (companyContact.companyId == companyId) {
                if (companyContact.employerId == userId) {
                    isOwner = true;
                } else {
                    var employerId = companyContact.employerId
                }
                break;
            }
        }

        if (isOwner) {
            var applicants = [];
            for (var studentJob of studentJobs) {
                applicants.push({
                    id: studentJob.studentId
                });
            }
            res.send({
                status: "success",
                job: job,
                isOwner: isOwner,
                applicants: applicants
            });
        } else {
            var applicationStatus = -1;
            for (var studentJob of studentJobs) {
                if (studentJob.studentId) {
                    applicationStatus = studentJob.status;
                    break;
                }
            }
            res.send({
                status: "success",
                job: job,
                isOwner: isOwner,
                applicationStatus: applicationStatus,
                employer: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone
                }
            });
        }
    });
});

/* GET job with certain ID */
router.post("/getUserJobs/:userId", function(req, res) {
    models.sequelize.Promise.all([
        models.StudentJob.findAll({
            where: {
                studentId: req.body.userId,
            },
            include: [models.Job]
        }),
    ]).spread(function(allStudentJobs) {
        var jobArray = [];
        for (var studentJob of allStudentJobs) {
            jobArray.push({
                id: studentJob.Job.id,
                title: studentJob.Job.title,
                status: studentJob.Job.status
            });
        }
        console.log(jobArray);

        res.send({
            jobArray: JSON.stringify(jobArray)
        })
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

module.exports = router;
