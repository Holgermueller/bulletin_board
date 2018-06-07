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
  res.render('login', {
    title: "In Login"
  });
});

router.post('/', passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
}));

router.post('/register', (req, res, next) => {

  req.checkBody('confirmPassword', 'Passwords do not match, please try again.').equals(req.body.password);
  
  const errors = req.validationErrors();
  if (errors) {
    res.render('login', {
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
        res.redirect('/');
      });
    }).catch((err) => {
      res.status(500).render('login', {
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
