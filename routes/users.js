const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');
const db = require('../config/database');
const router = express.Router();



//set image upload storage
// const storage = multer.diskStorage({
//     destination: `/public/img/`,
//     filename: (req, file, cb) => {
//         cb (null, file.fieldname +'-' + Date.now() + path.extname(file.originalname) )
//     }
// });

//Init Upload
// const upload = multer({
//     storage: storage
// });

//login Form Post
router.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
      successRedirect: '/user/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })
    (req, res, next);
  });
  
  //register Form post
  router.post('/register', (req, res) =>{
    
    //destructuring Form data
    let {
      name,
      email,
      password,
      password2,
      picture
    } = req.body;

    let errors = [];

    if(password != password2){
      errors.push('Passwords do not match');
    }
  
    if(password.length < 6 || password.length > 32){
      errors.push('Password must be between 6 - 32 characters');
    }
    
    if(errors.length > 0){ 
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        picture
      });
     } else{
       let sql = `SELECT * FROM sqtdb_test WHERE email = '${email}'`;
        db.query(sql, (err, rows) => {
            if (err) console.log (err);
            if (rows.length > 0) {
              console.log(rows);
              errors = ['Email already registered, login or use another email']
              res.render('register', {
                errors,
                name,
                email,
                password,
                password2,
                picture
              });
          } else {
            const newUser = {
              name,
              email,
              password,
              picture,
              default: ''
            };
              bcrypt.hash(newUser.password, 12, (err, hash) => {
                if (err) { 
                  console.log (err);
                } else { 
                  
                  newUser.password = hash;
                  let sql = `INSERT INTO sqtdb_test SET ?`;
                  db.query(sql, newUser, (err, result) => {
                    if (err) { 
                      console.log (err);
                    } else { 
                      req.flash('success_msg', 'Registration successful, you can login now');
                      res.redirect('/login');
                    }
                  });
                }
            })
            
          }
      });
    }
  });
  
  //Logout User
  router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
  });
  
  //Profile Edit
  router.post('/profileedit', (req, res) =>{ 
    //destructuring Form data
    let {
      name,
      email,
      picture
    } = req.body;
    if ( picture == '') {
      let sql = `UPDATE sqtdb_test SET name = '${name}' Where email = '${email}'`;
      db.query(sql, (err, result) => {
          if (err) { 
            console.log (err);
          } else {
            req.flash('success_msg', 'Profile updated successfully');
            res.redirect('/user/dashboard');
          }
          
        });
    } else {
      let sql = `UPDATE sqtdb_test SET name = '${name}', picture = '${picture}' Where email = '${email}'`;
      db.query(sql, (err, result) => {
          if (err) { 
            console.log (err);
          } else {
            req.flash('success_msg', 'Profile updated successfully');
            res.redirect('/user/dashboard');
          }
        });
    }
  });

  //Change password
  router.post('/changepassword', (req, res) =>{
    //destructuring Form data
    let {
      oldPassword,
      password,
      password2,
      email
    } = req.body;
    let errors = [];

    if(password != password2){
      errors.push('New passwords do not match');
    }
  
    if((password.length < 6 || password.length > 32) || (oldPassword.length < 6 || oldPassword.length > 32)){
      errors.push('Password must be between 6 - 32 characters');
    }
    
    if(errors.length > 0){ 
      res.render('users/changepassword', {
        errors,
        oldPassword,
        password,
        password2,
        email
      });
     } else{

        let sql = `SELECT * FROM sqtdb_test WHERE email = '${email}'`;
          db.query(sql, (err, user) => {
            if (err) { 
                console.log (err);
            } else { 
              //Match password
              bcrypt.compare(oldPassword, user[0].password, (err, isMatch) =>{
                  
                if (err) { 
                    console.log (err);
                } else { 
                    if (isMatch){
                      bcrypt.hash(password, 12, (err, hash) => {
                        if (err) { 
                          console.log (err);
                        } else { 
                          let sql = `UPDATE sqtdb_test SET password = '${hash}' Where email = '${email}'`;
                          db.query(sql, (err, result) => {
                            if (err) { 
                              console.log (err);
                            } else {
                              req.flash('success_msg', 'Password Changed successfully');
                              res.redirect('/user/dashboard');
                            }
                          });
                        } 
                      })
                      
                    } else {
                      errors.push('Old password is incorrect')
                      res.render('users/changepassword', {
                        errors,
                        oldPassword,
                        password,
                        password2,
                        email
                      });
                    }
                }
              })
            }
          })
      }
  });


  module.exports = router;