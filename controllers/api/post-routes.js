const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Likes } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'category', 'content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id'],
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
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get by id
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'category', 'content'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
        include: {
          model: Post,
          attributes: ['user_id'],
          include: {
            model: User,
            attributes: ['username'],
          },
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
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a post
router.post('/', withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    user_id: req.session.user_id,
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// like a post
router.put('/likes', withAuth, (req, res) => {
  Post.like(
    { ...req.body, user_id: req.session.user_id },
    { Likes, Comment, User }
  )
    .then((updatedLikeData) => res.json(updatedLikeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update post
router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((postData) => {
      if (postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete post
router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((postData) => {
      if (postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(postData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
