const express = require('express');
const app = express();
const db = require('./db');

/*
var UserController = require('./user/UserController');
app.use('/users', UserController );
*/

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController );

module.exports = app;
