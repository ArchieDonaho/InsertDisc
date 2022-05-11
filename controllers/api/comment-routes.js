const router = require('express').Router();
const { Comment } = require('../../models');

// Get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Creates a comment


// Delete a comment


module.exports = router;
