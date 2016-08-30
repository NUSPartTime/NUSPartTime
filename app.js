var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var _ = require("underscore");
var sequelize = require("sequelize");

var routes = require('./routes/index');
var userManagement = require('./routes/userManagement');
// var notification = require('./routes/notification');
// var studentDetail = require('./routes/studentDetail');
// var company = require('./routes/company');
var jobManagement = require('./routes/jobManagement');
var companyManagement = require('./routes/companyManagement');

var app = module.exports = express();

app.use(express.static(path.join(__dirname, '/public')));

// view engine setup
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/userManagement', userManagement);
app.use('/companyManagement', companyManagement);
// app.use('/notification', notification);
// app.use('/company', company);
// app.use('/studentDetail', studentDetail);
app.use('/jobManagement', jobManagement);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers:
// if (app.get('env') === 'development') {
//   // development error handler: will print stacktrace
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// } else {
//   // production error handler: no stacktraces leaked to user
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: {}
//     });
//   });
// }

module.exports = app;
