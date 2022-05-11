const router = require('express').Router();

// User, Post, and Comment routes go here
const userRoutes = require('./user-routes.js');

// router.use for User, Post, and Comment routes go here
router.use('/users', userRoutes);

module.exports = router;
