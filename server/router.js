'use strict';

const express = require('express');
const bodyParser = require('body-parser');


const router = express.Router();

// Main Routesnpm

// This route is the homepage route which shows all shoes

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
    let admin_info="SELECT * FROM `admin_hcp_user_profile` WHERE `user_id` = '" + userId + "'"
    
    db.query(admin_info, (err, results) => {
        if (err) throw err;
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
  
  router.post('/add_doctor', (req, res, next) => {
    let post = req.body;
    let email = post.email;
    let username = post.username;
    let password = post.password;
    let first_name = post.firstName;
    let last_name = post.lastName;
    let dob = post.DOB;
    let home_address = post.homeAddress;
    let phone_number = post.phoneNumber;
    let user_role = 'doctor';

    let addQuery = "INSERT INTO `admin_hcp_user_profile` (first_name, last_name, position, number, image, user_name) VALUES ('" +
    first_name + "', '" + last_name + "', '" + position + "', '" + number + "', '" + image_name + "', '" + username + "')";
db.query(addQuery, (err, result) => {
    if (err) {
        return res.status(500).send(err);
    }
    res.redirect('/');
});
  })
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
  
// search doctor - admin

router.post('/admin_get_doctor', (req, res, next) => {
  let user = req.session.user;
  let post = req.body;
  let userEmail = post.email;
  let getdoctorQuery = "SELECT * FROM `admin_hcp_user_profile` WHERE `email` = '" + userEmail + "'";

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

//search patient - admin

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

  //doctor side
  router.get('/doctordash', (req, res,) => {
    res.render('doctor_dash', {
      pageId: 'doctor_dash',
      title: 'Welcome Dr.',
    })
  });


//logout route

router.get('/logout', (req, res, next) => {
  let message = 'Logout Successful';
  if (req.session){
    req.session.destroy((err) => {
      if(err){
        return next(err);
      } else {
        return res.redirect('welcome.ejs', {
          message: message,
          pageId: 'welcome',
          title: 'Welcome',
        })
      }
    })
  }
})
module.exports = router;
