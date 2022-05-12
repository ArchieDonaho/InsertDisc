const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Creates a comment
router.post('/', (req, res) => {
  Comment.create({
    content: req.body.content,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// Delete a comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((commentData) => {
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
