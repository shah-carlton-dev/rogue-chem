const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const body_parser = require('body-parser');
const express = require('express');

require('./db/db');

const app = express();

app.use(cors());
app.options('*', cors());

// parse JSON (application/json content-type)
app.use(body_parser.json());

// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'files')));

// router setup 
const fileRouter = require('./routes/files');
const videoRouter = require('./routes/videos');
const usersRouter = require('./routes/users.js');
const coursesRouter = require('./routes/courses.js');
const messagesRouter = require('./routes/messages.js');
app.use(fileRouter);
app.use(videoRouter);
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/msg', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
}); 

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3030, () => {
    console.log('Server started on port 3030');
})