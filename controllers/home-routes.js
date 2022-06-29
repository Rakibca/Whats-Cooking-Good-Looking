const router = require('express').Router();
const sequelize = require('../config/connection');
const { User,Recipe} = require('../models');


// GET all posts
// router.get('/', async (req, res) => {
//   res.render('homepage', {loggedIn: req.session.logged_in});
// });
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
              // {
              //     model: Comment,
              //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              //     include: {
              //         model: User,
              //         attributes: ['username']
              //     }
              // },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          const posts = postData.map(post => post.get({plain: true}));

          res.render('homepage', {posts, loggedIn: req.session.logged_in});
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});



















// LOGIN route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }
  res.render('login');
});

// SIGNUP route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }

  res.render('signup');
});


module.exports = router;



// router.get('/', (req, res) => {
//   Post.findAll({
//           attributes: [
//               'id',
//               'title',
//               'content',
//               'created_at'
//           ],
//           include: [{
//                   model: Comment,
//                   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                   include: {
//                       model: User,
//                       attributes: ['username']
//                   }
//               },
//               {
//                   model: User,
//                   attributes: ['username']
//               }
//           ]
//       })
//       .then(dbPostData => {
//           const posts = dbPostData.map(post => post.get({
//               plain: true
//           }));

//           res.render('homepage', {
//               posts,
//               loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       });
// });