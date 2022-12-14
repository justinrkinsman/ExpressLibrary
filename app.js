require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coolRouter = require('./routes/cool')
const catalogRouter = require('./routes/catalog')

var app = express();

// Set up Mongoose connection
const mongoose = require('mongoose')
const mongoDB = process.env.MONGO_URL
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, "MongoDB connection error:"))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/cool', coolRouter)
app.use('/catalog', catalogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/* Connection String
mongodb+srv://justin:expressPassword@cluster0.xxbrhzq.mongodb.net/local_library?retryWrites=true&w=majority

If that fails, try this:
mongodb+srv://justin:expressPassword@cluster0.xxbrhzq.mongodb.net/?retryWrites=true&w=majority
*/