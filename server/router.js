'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

// Main Routesnpm

router.get('/', (req, res,) => {
  let message = '';
    res.render('welcome', {
      message: message,
      pageId: 'welcome',
      title: 'Welcome',
    })
  });
// login route 
router.post('/login', (req, res) => {
  let message = 'db error';
  let sess = req.session;

  if(req.method == 'POST'){
    let post = req.body;
    let name = post.user_name;
    let pass = post.password;
    let loginQuery = "SELECT * FROM `login_info` WHERE `userName` = '"+name+"' and passWOrd = '"+pass+"'";
    db.query(loginQuery, (err, results) => {
      if(results[0].user_role === 'admin'){
        req.session.userId = results[0].user_id;
        req.session.user = results[0];
        res.redirect('/admindash');
      
      }
      else if(results[0].user_role === 'doctor'){
        req.session.userId = results[0].user_id;
        req.session.user = results[0];
        res.redirect('/doctordash');
      }
      else {
        message = 'Wrong Credentials.';
        res.render('welcome.ejs', {
          message: message,
          pageId: 'welcome',
          title: 'Welcome',
        });
      }
    });
  }
  else {
    res.render('welcome.ejs', {
      message: message,
      pageId: 'welcome',
      title: 'Welcome',
    });
  }
})

// LOAD ADMIN PAGE
router.get('/admindash', (req, res) => {
  let user = req.session.user;
  let userId = req.session.userId;

  if(userId === null){
    res.redirect('welcome.ejs', {
      message: message,
      pageId: 'welcome',
      title: 'Welcome',
    });
  }
  let admin_info="SELECT * FROM `ADMIN_HCP_USER_PROFILE` WHERE `user_id` = '" + userId + "'"
  
  db.query(admin_info, (err, results) => {

      res.render('admin_dash', {
      user: user,
      adminX: results[0],
      pageId: 'admin_dash',
      title: 'Admin Home',
    })
  })
});


  // CREATE ROUTES for ADMIN
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

  router.post('/create_category',  (req, res) => {
    let category_id = req.body.category_id;
    let category_name = req.body.category_name;
    let newNoteQuery = "INSERT INTO `report_category` (category_id, category_name) VALUES (LAST_INSERT_ID(), '" +
   category_name + "')";
  db.query(newNoteQuery, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    } else {
          res.redirect('/doctordash');
        }
      })
    })
  });
  // Search patient - admin
  router.get('/patient_profile', (req, res,) => {
    let patientId = req.params.userid;
    let getpatientQuery = "SELECT * FROM `admin_hcp_user_profile` WHERE patient_id = '" + patientId + "'";

    db.query(getpatientQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('doctor_profile', {
        pageId: 'doctor_profile',
        title: 'Doctor Profile',
        patientX: result[0],
      })
    })
  });
  
   // Search Doctor - admin


   router.post('/admin_get_doctor', (req, res, next) => {
    let user = req.session.user;
    let post = req.body;
    let userEmail = post.email;
    let getdoctorQuery = "SELECT * FROM `ADMIN_HCP_USER_PROFILE` WHERE `email` = '" + userEmail + "'";
  
      db.query(getdoctorQuery, (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render('doctor_profile', {
          user: user,
          pageId: 'doctor_profile',
          title: results[0].first_name,
          doctorX: results[0],
        })
  })
  })
  
  router.get('/doctor_dash', (req, res,) => {
    res.render('doctor_dash', {
      pageId: 'doctor_dash',
      title: 'Welcome Doctor',
    })
  });

  // Search patient - admin

  router.post('/get_patient', (req, res, next) => {
    let user = req.session.user;
    let post = req.body;
    let patientId = post.patient_id;
    let getpatientQuery = "SELECT * FROM `patient_profile` WHERE `patient_id` = '" + patientId + "'";
  
      db.query(getpatientQuery, (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.render('patient_profile', {
          user: user,
          pageId: 'patient_profile',
          title: results[0].first_name,
          patientX: results[0],
        })
  })
  })
  

// Logout route

router.get('/logout', (req, res, next) => {
  let message = 'Logout Successful';
  if (req.session){
    req.session.destroy((err) => {
      if(err){
        return next(err);
      } else {
        return res.redirect('/') ;
      }
    })
  }
})

  // Category Search
  router.get('/search_category', (req, res,) => {
    res.render('search_category', {
      pageId: 'search_category',
      title: 'Search Category',
    })
  });
  
  // Notes - create new and history

  router.get('/note_history', (req, res,) => {
    res.render('note_history', {
      pageId: 'note_history',
      title: 'Note History',
    });
  });
router.get('/note_history/:patient_id', (req, res) => {
    let patient_id = req.params.patient_id;
    let getNoteQuery = "SELECT * FROM `notes` WHERE `patient_id` = '" + patient_id + "' ORDER BY Date DESC ";
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
        res.redirect('/doctordash');
      }
    })
});

router.get('/patient_report/:patient_id', (req, res) => {
  let patient_id = req.params.patient_id;
  let getReportQuery = "SELECT * FROM `patient_report` WHERE `patient_id` = '" + patient_id + "' ORDER BY datetime DESC";
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
  let getCategoryQuery = "SELECT category_id FROM `report_category` ORDER BY category_id ASC";
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
        res.redirect('/doctordash');
      }
      console.log(result);
    })
});

module.exports = router;