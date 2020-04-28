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

const app = express();


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


app.use('/', indexRouter);
app.use('/api', apiRouter);


/////////////////////////////////////////////////////////////
//      CATCHALL
app.use('*', (req, res) => {
  res.status(404).send({
    success: false,
    time: new Date(),
    message: "The specified resource could not be found.",
  })
})
/////////////////////////////////////////////////////////////

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;