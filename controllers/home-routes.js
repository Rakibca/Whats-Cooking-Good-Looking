const router = require('express').Router();
const sequelize = require('../config/connection');
const { User,Recipe } = require('../models');


// GET ON RANDOM RECIPE FROM THE API (RAKIBUL)
router.get('/', (req, res) => {
  Recipe.findAll({
          attributes: [
              'id',
              'name',
              'creator_id',
              'ingredients',
              'instruction'
          ],
          include: [
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(rcpData => {
          const rcps = rcpData.map(rcp => rcp.get({plain: true}));

          res.render('homepage', {rcps, loggedIn: req.session.logged_in});
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// LOGIN route (TONY)
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

// SIGNUP route (TONY)
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }

  res.render('signup');
});


module.exports = router;
