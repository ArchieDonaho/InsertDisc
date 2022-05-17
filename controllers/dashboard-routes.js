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
  })
    .then((userData) => {
      // serialize data before passing to template
      const user = userData.map((post) => post.get({ plain: true }));
      const dashboard = 1;
      console.log(user);
      res.render('dashboard', { posts, dashboard, loggedIn: true });
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
