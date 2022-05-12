const router = require('express').Router();
const req = require('express/lib/request');
const { Post, Like, User, Comment } = require('../models');

// Get route for homepage
router.get('/homepage', (req, res) => {
  // need to add session login information as well
 res.render('homepage');
});

// Get route for Movie category page
router.get('/movies', (req, res) => {
  // will need to add session information as well
  res.render('movies');
});

// Get route for Music category page
router.get('/music', (req, res) => {
  // will need to add session information as well
  res.render('music');
});

// Get route for Games category page
router.get('/games', (req, res) => {
  // will need to add session information as well
  res.render('games');
});

module.exports = router;
