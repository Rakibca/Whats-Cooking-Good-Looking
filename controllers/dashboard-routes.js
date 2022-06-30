const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth.js');

// GET ALL RECIPES (TONY)
router.get('/', withAuth, (req, res) => {
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
  
            res.render('dashboard', {rcps, loggedIn: req.session.logged_in});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
  });


router.get('/newrcp', withAuth, (req, res) => {
    res.render('newrcpform', {
        loggedIn: true
    })
});

// router.get('/edit/:id', withAuth, (req, res) => {
//     Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             include: [{
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         .then(dbPostData => {
//             if (!dbPostData) {
//                 res.status(404).json({
//                     message: 'No post found with this id'
//                 });
//                 return;
//             }

//             const post = dbPostData.get({
//                 plain: true
//             });

//             res.render('edit-post', {
//                 post,
//                 loggedIn: true
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// })

// router.get('/new', (req, res) => {
//     res.render('add-post', {
//         loggedIn: true
//     })
// })

module.exports = router;