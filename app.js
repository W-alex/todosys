var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var indexRouter = require('./routes/index');

var app = express();

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', require('./routes/user'))
app.use('/todo', require('./routes/todo'))

mongoose.connect("mongodb://localhost:27017/todosys", function (err) {
  if (err) {
    throw err;
  }
  console.log("connection is already founded!!")
})


module.exports = app;