var models = require('../models');
var express = require('express');
var router = express.Router();

/* GET notifications listing. */
router.post('/allNotifications', function(req, res) {
    var userId = req.body.userId;
    console.log("userId: " + userId);
    models.Notification.findAll({
        where: {
            userId: userId
        },
        include: [models.Job]
    }).then(function(allNotifications) {
        console.log(allNotifications);
        res.send({
            notificationArray: JSON.stringify(allNotifications)
        });
    });
});

/* POST mark as read */
router.post('/readNotification', function(req, res) {
    var id = req.body.notificationId;
    models.Notification.update({
        status: 1
    },{
        where: {
            id: id
        }
    }).then(function(){
        res.send({
            status: 1
        });
    });
});

module.exports = router;
