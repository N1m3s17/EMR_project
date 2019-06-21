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
    let getpatientQuery = "SELECT * FROM `admin_hcp_user_profile` WHERE patient_id = '" + patientId + "'";

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

//   router.get('/note_history'), (req, res) => {
//     let query = "SELECT * FROM `notes` ORDER BY date DESC LIMIT 10"; // query database to get all the notes

//     // execute query
//     db.query(query, (err, result) => {
//         if (err) {
//             res.redirect('/note_history');
//         }
//         res.render('note_history', {
//             title: "Note History"
//             ,patientX: result
//         });
//     });
// };

//   router.get('/note_history', (req, res) => {
//     // let patient_id = req.params.patient_id;
//     // let user_id = req.body.user_id;
//     // let note_text = req.body.note_text;
//     let query = "SELECT * FROM `notes`";
//     db.query(query, (err, result) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.render('note_history', {
//             title: "Note History"
//             ,patient: result[0]
//             ,message: ''
//         });
//     });
// });
// router.post('/note_history', (req, res) => {
//     let patient_id = req.params.patient_id;
//     let user_id = req.body.user_id;
//     let note_text = req.body.note_text;

//     let query = "UPDATE `notes` SET `patient_id` = '" + patient_id + "', `user_id` = '" + user_id + "', `note_text` = '" + note_text + "'";
//     db.query(query, (err, result) => {
//         if (err) {
//             return res.status(500).send(err);
//         }
//         res.redirect('/');
//     });
// });

router.get('/note_history', (req, res) => {
  //  let patient_id = req.params.patient_id;
   // let user_id = req.body.user_id;
    //let note_text = req.params.note_text;
    //let query = "SELECT * FROM `notes` WHERE patient_id = '" + patient_id + "' ORDER BY Date DESC LIMIT 10";

    let getNoteQuery = "SELECT * FROM `notes`";
    db.query(getNoteQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.render('note_history', {
        pageId: 'note_history',
        title: 'Note History',
        patientX: result[0],
      })
      console.log(result);
    })
  });

//     db.query('SELECT * FROM notes', (err, result) =>{
//       if(!err) {
//         return res.status(500).send(err);
//       }
//       if (result.length > 0) {
//         message = 'No notes currently exist';
//         res.render('note_history', {
//           message,
//           title: "Add a New Note"
//         }); 
//       } else {
//         if (err) {
//           return res.status(500).send(err);
//         }
//         let query = "INSERT INTO `notes` (patient_id, user_id, note_text) VALUES ('" + patient_id + "','" + user_id + "', '" + note_text + "')";
//         db.query(query, (err, result) => {
//           if (err){
//             return res.status(500).send(err);
//           }
//           res.render('note_history', {
//             pageId: 'note_history',
//             title: 'Note History',
//         });
//         })
//       };
//     });
// });


  router.get('/create_note', (req, res,) => {
    res.render('create_note', {
      pageId: 'create_note',
      title: 'Create Note',
    });
  });

router.post('/create_note',  (req, res) => {
  let patient_id = req.params.patient_id;
  let user_id = req.params.user_id;
  let note_text = req.params.note_text;
  let query = "INSERT INTO `notes` (patient_id, date, user_id, note_text) VALUES ('" +
  patient_id + "', NOW()), '" + user_id + "', '" + note_text + "',)";
  console.log(patient_id);
db.query(query, (err, result) => {
  if (err) {
      return res.status(500).send(err);
  }
  let query = "INSERT INTO `notes` (patient_id, date, user_id, note_text) VALUES ('" +
  patient_id + "', CURDATE(), '" + user_id + "', '" + note_text + "',)";
  db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
              }
        res.redirect('/notes_history');
});
});
});

module.exports = router;