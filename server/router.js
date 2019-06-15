'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

// Main Routesnpm

// This route is the homepage route which shows all shoes

router.get('/', (req, res,) => {
    res.render('welcome', {
      pageId: 'welcome',
      title: 'Welcome',
    })
  })

router.get('/admindash', (req, res,) => {
    res.render('admin_dash', {
      pageId: 'admin_dash',
      title: 'Admin Home',
    })
  })

  router.get('/create_doctor', (req, res,) => {
    res.render('create_doctor', {
      pageId: 'create_doctor',
      title: 'Create Doctor',
    })
  })
  
  router.get('/create_patient', (req, res,) => {
    res.render('create_patient', {
      pageId: 'create_patient',
      title: 'Create Patient',
    })
  }) 
  
  router.get('/create_category', (req, res,) => {
    res.render('create_category', {
      pageId: 'create_category',
      title: 'Create Category',
    })
  })
  

  //doctor side
  router.get('/doctordash', (req, res,) => {
    res.render('doctor_dash', {
      pageId: 'doctor_dash',
      title: 'Welcome Dr.',
    })
  })

  router.get('/patientpage_doctor', (req, res,) => {
    res.render('patient_page_doctor', {
      pageId: 'patient_page_doctor',
      title: 'Patient Name',
    })
  })
module.exports = router;
