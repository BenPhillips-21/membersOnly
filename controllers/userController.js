const User = require('../models/user')
const bcrypt = require("bcryptjs");
const passport = require("passport"); 

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.log_out = (req,res) => {
  req.logout(function(err) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      // User logged out successfully
      res.redirect('/'); // Redirect to homepage or any other page
    }
  });
}

exports.login_get = (req, res) => {
    res.render('login')
}

exports.login_post = passport.authenticate("local", {
    successRedirect:"/",
    failureRedirect:"/login",
})

exports.register = asyncHandler(async (req, res, next) => {
    res.render("register")
})

exports.validate_sign_up = [
 body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 5 }).withMessage('Username must be at least 5 characters long')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers'),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
]

exports.handle_validation_errors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('customError', { errors: errors.array() })
  }
  next();
};

exports.register_post = asyncHandler(async (req, res, next) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
  if (err) {
    console.error('Error occurred during password hashing:', err);
    return res.status(500).send('An error occurred while processing your request.');
  } else {
    try {
      const user = new User({
        username: req.body.username,
        password: hashedPassword 
      });
      await user.save(); 
      res.redirect('/');
    } catch (error) {
      return next(err);
    }
  }
});
})

exports.login = asyncHandler(async (req, res, next) => {
    res.render("login")
})