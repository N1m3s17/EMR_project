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
    let admin_info="SELECT * FROM `admin_hcp_user_profile` WHERE `user_id` = '" + userId + "'";
    
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
  
  //catsss
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
    let user_id = parseInt(post.user_id, 10);
    let user_role = 'doctor';

    let addProfileQuery = "INSERT INTO `admin_hcp_user_profile` (user_id, first_name, last_name, email, date_of_birth, address, phone_number) VALUES ('" +
    user_id + "', '" + first_name + "', '" + last_name + "', '" + email + "', '" + dob + "', '" + home_address + "', '"+ phone_number + "');INSERT INTO `login_info` (user_id, userName, passWOrd, user_role) VALUES ('" + user_id +"', '" + username + "', '" + password + "', '" + user_role + "')";

    db.query(addProfileQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
    }
    res.redirect('/admindash');
});
})
  router.get('/create_patient', (req, res,) => {
    res.render('create_patient', {
      pageId: 'create_patient',
      title: 'Create Patient',
    })
  });
  
  router.post('/add_patient', (req, res,) => {
    let post = req.body;
    let email = post.email;
    let first_name = post.firstName;
    let last_name = post.lastName;
    let dob = post.DOB;
    let home_address = post.homeAddress;
    let phone_number = post.phoneNumber;
    let patient_id = parseInt(post.patient_id, 10);
    let gender = post.gender;

    let addProfileQuery = "INSERT INTO `patient_profile` (patient_id, first_name, last_name, email, date_of_birth, address, phone_number, gender) VALUES ('" +
    patient_id + "', '" + first_name + "', '" + last_name + "', '" + email + "', '" + dob + "', '" + home_address + "', '"+ phone_number + "', '" + gender + "');";

    db.query(addProfileQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
    }
    res.redirect('/admindash');
  }); 
})

//create a category
router.get('/create_category', (req, res,) => {
  res.render('create_category', {
    pageId: 'create_category',
    title: 'Create Category',
  })
});

router.post('/add_category', (req, res,) => {
  let post = req.body;
  let categoryId = post.category_id;
  let categoryName = post.category_name;

  let addCategoryQuery = "INSERT INTO `report_category` (category_id, category_name) VALUES ('" +categoryId + "', '" + categoryName + "');";

  db.query(addCategoryQuery, (err, result) => {
    if (err) {
      return res.status(500).send(err);
  }
  res.redirect('/admindash');
}); 
})

//updating routes for doctor and patient
//Catss
router.get('/updatedoctor/:id', (req, res) => {
  let userid = req.params.id;
  let sql="SELECT * FROM `admin_hcp_user_profile` WHERE `user_id` = '" + userid + "'";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('update_doctor', {
      pageId: 'update_doctor',
      title: 'Update Doctor',
      doctorX: results[0],
    })
  });
})

router.post('/editdoctor/:id', (req, res) => {
  let user_id = req.params.id;
  let first_name = req.body.firstName;
  let last_name = req.body.lastName;
  let email = req.body.email;
  let dob = req.body.DOB;
  let home_address = req.body.homeAddress;
  let phone_number = req.body.phoneNumber;
  let updateQuery = "UPDATE admin_hcp_user_profile SET first_name = '"+first_name+"', last_name = '"+last_name+"', email = '"+email+"', date_of_birth = '"+dob+"', address = '"+home_address+'", phone_number = "'+phone_number+"' WHERE user_id = '" + user_id + "'";
  db.query(updateQuery, (err, results) => {
    if (err) throw err;
    res.redirect('/admindash')
  })
})

router.get('/updatepatient/:id', (req, res) => {
  let patientid = req.params.id;
  let sql="SELECT * FROM `patient_profile` WHERE `patient_id` = '" + patientid + "'";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('updatepatient', {
      pageId: 'updatepatient',
      title: 'Update Patient',
      patientX: results[0],
    })
  });
})

router.post('/editpatient/:id', (req, res) => {
  let patientid = req.params.id;
  let first_name = req.body.firstName;
  let last_name = req.body.lastName;
  let email = req.body.email;
  let dob = req.body.DOB;
  let home_address = req.body.homeAddress;
  let phone_number = req.body.phoneNumber;
  let gender = req.body.gender;
  let updateQuery = "UPDATE patient_profile SET first_name = '"+first_name+"', last_name = '"+last_name+"', email = '"+email+"', date_of_birth = '"+dob+"', address = '"+home_address+"', phone_number = '"+phone_number+"',  gender = '"+gender+"' WHERE patient_id = '" + patientid + "'";
  db.query(updateQuery, (err, results) => {
    if (err) throw err;
    res.redirect('/admindash')
  })
})


router.get('/updatecategory/:id', (req, res) => {
  let categoryid = req.params.id;
  let sql="SELECT * FROM `report_category` WHERE `category_id` = '" + categoryid + "'";

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.render('updatecategory', {
      pageId: 'updatecategory',
      title: 'Update Category',
      categoryX: results[0],
    })
  });
})

router.post('/editcategory/:id', (req, res) => {
  let categoryid = req.params.id;
  let category_name = req.body.category_name;
  let updateQuery = "UPDATE report_category SET category_name = '"+category_name+"' WHERE category_id = '" + categoryid + "'";
  db.query(updateQuery, (err, results) => {
    if (err) throw err;
    res.redirect('/admindash')
  })
})

//delete doctor and patient

router.get('/deletedoctor/:id', (req, res) => {
  let user_id = req.params.id;

  let deleteQuery = "DELETE FROM admin_hcp_user_profile WHERE user_id = '" +user_id+ "'";

  db.query(deleteQuery, (err, results) =>{
    if (err) throw err;
    res.redirect('/admindash')
  })
})
  
router.get('/deletepatient/:id', (req, res) => {
  let patient_id = req.params.id;

  let deleteQuery = "DELETE FROM admin_hcp_user_profile WHERE patient_id = '" +patient_id+ "'";

  db.query(deleteQuery, (err, results) =>{
    if (err) throw err;
    res.redirect('/admindash')
  })
})

router.get('/deletecategory/:id', (req, res) => {
  let category_id = req.params.id;

  let deleteQuery = "DELETE FROM report_category WHERE category_id = '" +category_id+ "'";

  db.query(deleteQuery, (err, results) =>{
    if (err) throw err;
    res.redirect('/admindash')
  })
})


// search doctor

router.post('/get_doctor', (req, res, next) => {
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

//search patient 

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

// search category 
router.post('/get_category', (req, res, next) => {
  let user = req.session.user;
  let post = req.body;
  let category_id = post.category_id;
  let getCategoryQuery = "SELECT * FROM `report_category` WHERE `category_id` = '" + category_id + "'";

    db.query(getCategoryQuery, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('category_page', {
        user: user,
        pageId: 'category_page',
        title: results[0].category_name,
        categoryX: results[0],
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
        return res.redirect('/');
      }
    })
  }
})
module.exports = router;
