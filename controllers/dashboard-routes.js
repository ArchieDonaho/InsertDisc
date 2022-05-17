const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', (req, res) => {
//   const dashboard = 1;
//   res.render('dashboard', { dashboard });
// });

// render the dashboard with all the user's posts
router.get('/', withAuth, (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ['id', 'username'],
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
        model: Post,
        attributes: [
          'id',
          'title',
          'category',
          'content',
          'created_at',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM Likes WHERE user.id = likes.user_id)'
            ),
            'like_count',
          ],
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'content', 'user_id', 'post_id', 'created_at'],
            include: [
              {
                model: User,
                attributes: ['username'],
              },
              {
                model: Post,
                attributes: ['user_id'],
                include: {
                  model: User,
                  attributes: ['username'],
                },
              },
            ],
          },
        ],
      },
    ],
  })
    .then((userData) => {
      // serialize data before passing to template
      const user = userData.get({ plain: true });
      const dashboard = 1;
      console.log(user.comments);
      res.render('dashboard', { user, dashboard, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// // display page to edit a post
// router.get('/edit/:id', withAuth, (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ['id', 'title', 'content', 'created_at'],
//     include: [
//       {
//         model: User,
//         attributes: ['username'],
//       },
//       {
//         model: Comment,
//         attributes: ['id', 'user_id', 'content', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username'],
//         },
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       // serialize the data and send it to the sinple post page
//       const post = dbPostData.get({ plain: true });
//       res.render('edit-post', { post, loggedIn: req.session.loggedIn });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
