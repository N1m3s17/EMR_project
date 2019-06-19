'use strict';

const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

app.set('view engine', 'ejs');

// connect db
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password:'',
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