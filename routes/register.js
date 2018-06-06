const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const db = require('../models/');
const bcrypt = require('bcryptjs');

router.use(bodyParser.urlencoded({
  extended: true,
}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.render('register', {
    title: "In Register",
  });
});

router.post('/', (req, res, next) => {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('email', 'Email field cannot be empty.').notEmpty();
  req.checkBody('password', 'Password field cannot be empty.').notEmpty();
  req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
  req.checkBody('confirmPassword', 'Passwords do not match, please try again.').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      title: 'Registration Error',
      errors,
    });
  } else {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    db.User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    }).then((user) => {
      const userId = user.id;
      req.login(userId, () => {
        res.redirect('/login');
      });
    }).catch((err) => {
      res.status(500).render('register', {
        title: 'Something went wrong',
      });
    });
  }
});

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((userId, done) => {
  done(null, userId);
});


module.exports = router;