const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Like, User, Comment } = require('../models');

// Get route for homepage
router.get('/homepage', (req, res) => {
  // need to add session login information as well
 res.render('homepage');
});

// Get route for Music category page
router.get('/music', (req, res) => {
  // will need to add session information as well
  Post.findAll({
    where: {
      content: 'music'
    },
    attributes: [
      'id',
      'title',
      'category',
      'content',
      'user_id',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM like WHERE post.id = like.post_id'
        ),
        'like_count'
      ]
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'content',
          'user_id',
          'post_id'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(postData => {
    const posts = postData.map(post => post.get({ plain: true }));

    res.render('music', { posts });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get route for Movie category page
router.get('/movies', (req, res) => {
  // will need to add session information as well
  Post.findAll({

  })
  res.render('movies');
});

// Get route for Games category page
router.get('/games', (req, res) => {
  // will need to add session information as well
  res.render('games');
});

module.exports = router;
