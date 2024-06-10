// src/lib/auth.js
module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('message', 'Please log in to view that resource');
      res.redirect('/login');
    }
  };
  