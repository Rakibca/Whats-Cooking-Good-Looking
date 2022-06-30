const axios = require("axios");
const router = require('express').Router();
const sequelize = require('../config/connection');
const {
  User,
  Recipe
} = require('../models');


// GET ON RANDOM RECIPE FROM THE API (RAKIBUL)
router.get('/', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
    params: {
      number: '1',
      tags: 'vegetarian,dessert' //Choose the types of recipe randomly by using tag names
    },
    headers: {
      'X-RapidAPI-Key': '6092f415c9msh596be8e63a564f4p162e5ajsn61ab17493dba',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  axios.request(options)
    .then(rcpData => {
      rcpArray = [];
      rcpArray.push(rcpData.data.recipes[0].title);
      //console.log(rcpData.data.recipes[0].title);
      const arrayKeys = Object.keys(rcpData.data.recipes[0].extendedIngredients);
      const numberOfIngredients = arrayKeys.length;
      for (i = 0; i < numberOfIngredients; i++) {
        rcpArray.push(rcpData.data.recipes[0].extendedIngredients[i].originalName);
        //console.log(rcpData.data.recipes[0].extendedIngredients[i].originalName);
      }
      rcpArray.push(rcpData.data.recipes[0].instructions);
      //console.log(rcpData.data.recipes[0].instructions);
      const rcps = rcpArray;
      //console.log(rcps);

      //Render to homepage
      res.render('homepage', {
        rcps,
        loggedIn: req.session.logged_in
      });
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
