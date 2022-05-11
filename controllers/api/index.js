const router = require('express').Router();

// User, Post, and Comment routes go here
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');

// router.use for User, Post, and Comment routes go here
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;
