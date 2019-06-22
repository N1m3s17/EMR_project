'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

// Main Routesnpm

router.get('/', (req, res,) => {
    res.render('welcome', {
      pageId: 'welcome',
      title: 'Welcome',
    })
  });

router.get('/admindash', (req, res,) => {
    res.render('admin_dash', {
      pageId: 'admin_dash',
      title: 'Admin Home',
    })
  });

  router.get('/create_doctor', (req, res,) => {
    res.render('create_doctor', {
      pageId: 'create_doctor',
      title: 'Create Doctor',
    })
  });
  
  router.get('/create_patient', (req, res,) => {
    res.render('create_patient', {
      pageId: 'create_patient',
      title: 'Create Patient',
    })
  });

  router.get('/create_category', (req, res,) => {
    res.render('create_category', {
      pageId: 'create_category',
      title: 'Create Category',
    })
  });
  
   // Search Doctor - admin

  router.get('/doctor_profile', (req, res,) => {
    let userEmail = req.params.email;
    console.log(userEmail);
    let getdoctorQuery = "SELECT * FROM `admin_hcp_user_profile` WHERE email = '" + userEmail + "'";

    db.query(getdoctorQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('doctor_profile', {
        pageId: 'doctor_profile',
        title: 'Doctor Profile',
        doctor: result[0],
      })
    })
  });
  
  // Search patient - admin
  router.get('/patient_profile', (req, res,) => {
    let patientId = req.params.patientId;
    let getpatientQuery = "SELECT * FROM `admin_hcp_user_profile`";

    db.query(getpatientQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('patient_profile', {
        pageId: 'patient_profile',
        title: 'Patient Profile',
        patientX: result[0],
      })
    })
  });

  // Doctor side
  router.get('/doctor_dash', (req, res,) => {
    res.render('doctor_dash', {
      pageId: 'doctor_dash',
      title: 'Welcome Dr.',
    })
  });

  // Category Search
  router.get('/search_category', (req, res,) => {
    res.render('search_category', {
      pageId: 'search_category',
      title: 'Search Category',
    })
  });

  
  // Notes - create new and history

router.get('/note_history', (req, res) => {
    let getNoteQuery = "SELECT * FROM `notes` ORDER BY Date DESC";
    db.query(getNoteQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      } else {
          res.render('note_history', {
          pageId: 'note_history',
          title: 'Note History',
          'sql': result,
      })
    }
      console.log(result);
    })
  });

  router.get('/create_note', (req, res,) => {
    res.render('create_note', {
      pageId: 'create_note',
      title: 'Create Note',
    });
  });

router.post('/create_note',  (req, res) => {
  let patient_id = req.body.patient_id;
  let user_id = req.body.user_id;
  let note_text = req.body.note_text;
  let newNoteQuery = "INSERT INTO `notes` (patient_id, date, user_id, note_text) VALUES ('" +
  patient_id + "', CURRENT_TIMESTAMP(), '" + user_id + "', '" + note_text + "')";
db.query(newNoteQuery, (err, result) => {
  if (err) {
      return res.status(500).send(err);
  } else {
        res.redirect('/note_history');
      }
    })
});

router.get('/patient_report', (req, res) => {
  let getReportQuery = "SELECT * FROM `patient_report` ORDER BY datetime DESC";
  db.query(getReportQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
        res.render('patient_report', {
        pageId: 'patient_report',
        title: 'Patient Report',
        'sql': result,
    })
  }
    console.log(result);
  })
});



router.get('/create_report', (req, res) => {
  let getCategoryQuery = "SELECT * FROM `report_category` ORDER BY category_name ASC";
  db.query(getCategoryQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
        res.render('create_report', {
        pageId: 'create_report',
        title: 'Create Report',
        'sql': result,
    })
  }
    console.log(result);
  })
});



router.post('/create_report',  (req, res) => {
  let patient_id = req.body.patient_id;
  let user_id = req.body.user_id;
  let category_id = req.body.category_id;
  let report_name = req.body.report_name;
  let report_url = req.body.report_url;
  let newNoteQuery = "INSERT INTO `patient_report` (report_id, patient_id, user_id, category_id, report_name, report_url) VALUES (LAST_INSERT_ID(), '" +
  patient_id + "', '" + user_id + "', '" + category_id + "', '" + report_name + "', '" + report_url + "')";
db.query(newNoteQuery, (err, result) => {
  if (err) {
      return res.status(500).send(err);
  } else {
        res.redirect('/patient_report');
      }
      console.log(result);
    })
});

module.exports = router;