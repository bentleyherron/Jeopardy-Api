// Add env
const dotenv = require('dotenv');
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Routing
const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logOutRouter = require('./routes/logout');
const profileRouter = require('./routes/profile');
const signUpRouter = require('./routes/signup');
const forgotRouter = require('./routes/forgot');

const app = express();

// Session
const session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
  store: new FileStore({}),
  secret: process.env.SESSION_KEY,
  cookie: { secure: false }
}));

// view engine setup
const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add helmet for headers
const helmet = require('helmet');
app.use(helmet());

// Add cors for requests
const cors = require('cors');
app.use(cors());

// Add compression
const compression = require('compression');
app.use(compression());

// Requires Login
function requireLogin(req, res, next) {
  if (req.session && req.session.user) {
      next();
  } else {
      res.redirect('/login');
  }
};

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/forgot', forgotRouter);
app.use('/login', loginRouter);
app.use('/signup', signUpRouter);
app.use('/logout', requireLogin, logOutRouter);
app.use('/profile', requireLogin, profileRouter);


/////////////////////////////////////////////////////////////
//      TEST DEV CATCHALL
app.use('*', (req, res) => {
  res.status(404).send("Test Dev - Catchall got it.");
})
/////////////////////////////////////////////////////////////

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