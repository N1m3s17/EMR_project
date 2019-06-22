'use strict';

const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

// connect db
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password:'Chester4!',
    database:'fs1030_group_project'
})

// Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(bodyParser.json()); // parse form data client
app.use('/static', express.static('static'));

//Routes

app.use(router);

app.listen(3000, () => {
    console.log('Server is Running!');

});