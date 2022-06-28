const router = require('express').Router();
const sequelize = require('../config/connection');
// const { User,Post,Comment } = require('../models');


// GET all posts
router.get('/', async (req, res) => {
  res.render('homepage');
});

// LOGIN route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

// SIGNUP route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('signup');
});


module.exports = router;
