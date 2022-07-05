const router = require('express').Router();
const { User, Recipe } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require("axios");

// Create a recipe
router.post("/", withAuth, (req, res) => {
    Recipe.create({
            name: req.body.rcp_name,
            creator_id: req.session.user_id,
            ingredients: req.body.rcp_ing,
            instruction: req.body.rcp_ins
        })
        .then((rcpData) => res.json(rcpData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/onlinercps", withAuth, (req, res) => {
    res.render('onlinercps',{loggedIn: true});
});

router.get("/onlinercps/:query", withAuth, (req, res) => {
    // const str = req.params.query;
    // console.log(str);
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
        params: {
          query: req.params.query,
        },
        headers: {
          'X-RapidAPI-Key': 'a766c1ba87mshd3cf5bc6f455972p120e21jsne9c4889c2932',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    axios.request(options).then(rcpData => {
        // console.log(rcpData.data);
        base_url = rcpData.data.baseUri;
        olrcps = rcpData.data.results;
        console.log(olrcps);
        return res.render('onlinercps', {
            olrcps,
            base_url,
            loggedIn: req.session.logged_in
          });
    })
});

router.get("/onlinercps/query/:id", withAuth, (req, res) => {
    URL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/IDID/information';
    URL = URL.replace('IDID', req.params.id);
    console.log(URL);
    const options = {
        method: 'GET',
        url: URL,
        headers: {
          'X-RapidAPI-Key': 'a766c1ba87mshd3cf5bc6f455972p120e21jsne9c4889c2932',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      };
      axios.request(options)
      .then(rcpData => {
          var rcps = {             
              title: [],
              ingredients: [],
              instructions: [],
              source_url: [],
              image: []
          };
          console.log(rcpData.data);
          rcps.title.push(rcpData.data.title);
          const arrayKeys = Object.keys(rcpData.data.extendedIngredients);
          const numberOfIngredients = arrayKeys.length;
          allingredients = [];
          for (i = 0; i < numberOfIngredients; i++) {
              allingredients.push(rcpData.data.extendedIngredients[i].originalName);
          }
          rcps.ingredients.push(allingredients);
          instr = String(rcpData.data.instructions);
          instr = instr.replaceAll("<li>", "");
          instr = instr.replaceAll("<ol>", "");
          instr = instr.replaceAll("</li>", "");
          instr = instr.replaceAll("</ol>", "");
          rcps.instructions.push(instr);
          rcps.source_url.push(rcpData.data.sourceUrl);
          rcps.image.push(rcpData.data.image);
  
        //Render to homepage
        res.render('singleOLrcp', {
          rcps,
          loggedIn: req.session.logged_in
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});



// GET RECIPES FROM THE API BASED ON USER SEARCH (RAKIBUL)
router.post('/search', withAuth, (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
        params: {
          query: req.body.keywords,
        },
        headers: {
          'X-RapidAPI-Key': 'a766c1ba87mshd3cf5bc6f455972p120e21jsne9c4889c2932',
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
    };
    axios.request(options).then(rcpData => {
        console.log(rcpData.data);
        return res.render('login');
    })
})


// EDIT A RECIPE
router.put("/:id", withAuth, (req, res) => {
    Recipe.update(
        {
            name: req.body.rcp_name,
            ingredients: req.body.rcp_ing,
            instruction: req.body.rcp_ins
        }, 
        {
            where: {
                id: req.params.id,
            },
        })
        .then((rcpData) => {
            if (!rcpData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(rcpData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


//DELETE A RECIPE
router.delete("/:id", withAuth, (req, res) => {
    Recipe.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((rcpData) => {
            if (!rcpData) {
                res.status(404).json({
                    message: "No post found with this id"
                });
                return;
            }
            res.json(rcpData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});




module.exports = router;