module.exports = {
    ensureAuthenticated: (req, res, next)=>{
      if(req.isAuthenticated()){
        return next();
      }
      req.flash('error_msg', 'Not Authorized, Login or Register');
      res.redirect('/login');
    }
  }