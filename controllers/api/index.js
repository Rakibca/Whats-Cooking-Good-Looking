const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const rcpRoutes = require('./rcp-routes.js');
// const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/rcps', rcpRoutes);
// router.use('/comments', commentRoutes)

module.exports = router;