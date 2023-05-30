require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks');
const session = require('express-session')

const indexRouter = require('./routes/index');

const app = express();


nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public', { type: 'text/css' }));

app.set('trust proxy', 1);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { sameSite: false, secure: false, httpOnly: false },
    }),
);
app.use('/', indexRouter);

module.exports = app;