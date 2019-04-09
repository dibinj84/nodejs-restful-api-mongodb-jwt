const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const DBLINK = process.env.DBLINK;
mongoose.connect(DBLINK, {useNewUrlParser: true});
