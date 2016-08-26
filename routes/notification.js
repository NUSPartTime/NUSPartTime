var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET notifications listing. */
router.get('/', function(req, res) {
  var is_authorized = false;
  var sess = req.session;
  if (sess.user_id) {
    is_authorized = true;
  } else {

  }

  models.Notification.findAll({
  	where: {
      userId: sess.user_id
    },
    include: [models.Job]
  }).then(function(notifications) {
    res.render('notification', {
      title: 'Notifications',
      notifications: notifications
    });
  });
});

/* POST mark as read */
router.post('/:notification_id/read', function(req, res) {
  var sess = req.session;
  models.Notification.update({
    status: 1
  },{
    where: {
      id: req.params.notification_id
    }
  }).then(function(){
    res.redirect('/notification');
  });
});

module.exports = router;
