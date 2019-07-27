const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) =>{
    
    //Match user
    let sql = `SELECT * FROM sqtdb_test WHERE email = '${email}'`;
        db.query(sql, (err, user) => {
        if (err) { 
            console.log (err);
        } else { 
            if (user.length  < 1) { 
                return done(null, false, {message: `User does not Exist , Please Register`});
            } 
        }
        
      //Match password
      bcrypt.compare(password, user[0].password, (err, isMatch) =>{
          
        if (err) { 
            console.log (err);
        } else { 
            if (isMatch){
            return done(null, user[0]);
            } else {
            return done(null, false, {message: `Password is Incorrect`});
            }
        }
      })
    })
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    let sql = `SELECT * FROM sqtdb_test WHERE id = ${id}`;
    db.query(sql, (err, user) => { 
        if (err) { 
            console.log (err);
        } else { 
            done(err, user[0]);
        }
    })
  });
}