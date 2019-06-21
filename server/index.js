'use strict';

const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

// Parse all incoming <form> data into an object we can access in our routes with `req.body`
app.use(express.urlencoded({ extended: true }));
// connect db
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password:'Chester4!',
    database:'fs1030_group_project'
})

// Connect to database
db.connect(function(error){
    if(!!error){
        console.log('Error connecting DB');
    } else {
    console.log('Connected');
    }
    });
global.db = db;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

//Routes

app.use(router);

app.listen(3000, () => {
    console.log('Server is Running!');

});