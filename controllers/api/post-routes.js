const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Like } = require('../../models');

// Get all 
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id', 
      'title', 
      'content'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(postData => res.json(postData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get by id


// create a post


// update post by id


// delete post


module.exports = router;
