const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Get route for Music category page
router.get('/music', (req, res) => {
  Post.findAll({
    where: {
      category: 'music',
    },
    attributes: [
      'id',
      'title',
      'category',
      'content',
      'user_id',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM Likes WHERE post.id = likes.post_id)'
        ),
        'like_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);

      // create variables to send through for the html to dynamically load
      const music = 1;

      res.render('categorypage', { posts, music });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get route for a single post in the music
router.get('/music/post/:id', (req, res) => {
  Post.findOne({
    where: {
      category: 'music',
      id: req.params.id,
    },
    attributes: [
      'id',
      'title',
      'category',
      'content',
      'user_id',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM Likes WHERE post.id = likes.post_id)'
        ),
        'like_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postData) => {
      if (!postData) {
        document.location.replace('/music');
      }
      const post = postData.get({ plain: true });
      console.log(post);

      // create variables to send through for the html to dynamically load
      const music = 1;

      res.render('single-post', { post, music });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get route for Movie category page
router.get('/movies', (req, res) => {
  Post.findAll({
    where: {
      category: 'movies',
    },
    attributes: [
      'id',
      'title',
      'category',
      'content',
      'user_id',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM Likes WHERE post.id = likes.post_id)'
        ),
        'like_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);

      // create variables to send through for the html to dynamically load
      const movies = 1;

      res.render('categorypage', { posts, movies });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get route for Games category page
router.get('/games', (req, res) => {
  Post.findAll({
    where: {
      category: 'games',
    },
    attributes: [
      'id',
      'title',
      'category',
      'content',
      'user_id',
      'created_at',
      [
        sequelize.literal(
          '(SELECT COUNT(*) FROM Likes WHERE post.id = likes.post_id)'
        ),
        'like_count',
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      console.log(posts);

      // create variables to send through for the html to dynamically load
      const games = 1;

      res.render('categorypage', { posts, games });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get route for homepage
router.get('/', (req, res) => {
  // need to add session login information as well
  res.render('homepage');
});

module.exports = router;
