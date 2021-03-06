'use strict';

require('dotenv').config()
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

// connect db
const db = mysql.createConnection ({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
})

// Connect to database
db.connect(function(error){
    if(!!error){
        console.warn(`Error connecting to ${process.env.DATABASE}!`);
    } else {
        console.warn(`Connected to database ${process.env.DATABASE}!`);
    }
    console.log(`Connected to database ${process.env.DATABASE}!`);
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
    console.log(`Server running on port ${process.env.PORT} @ url http://localhost:${process.env.PORT}`);


});