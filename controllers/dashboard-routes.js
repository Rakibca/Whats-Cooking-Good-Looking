const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth.js');
const axios = require("axios");

// GET ALL RECIPES (TONY)
router.get('/', withAuth, (req, res) => {
    Recipe.findAll({
            where: {
                creator_id: req.session.user_id
            },
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
            const myrcps = rcpData.map(rcp => rcp.get({plain: true}));
  
            res.render('dashboard', {myrcps, loggedIn: req.session.logged_in});
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

// EDIT A RECIPE PAGE
router.get('/edit/:id', withAuth, (req, res) => {
    Recipe.findOne({
            where: {
                id: req.params.id
            },
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
            if (!rcpData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }

            const rcp = rcpData.get({
                plain: true
            });

            res.render('editrecipe', {
                rcp,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

// router.get('/new', (req, res) => {
//     res.render('add-post', {
//         loggedIn: true
//     })
// })

module.exports = router;