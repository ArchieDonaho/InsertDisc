const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Like = require('./Like');

//define user/post associations
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//define like's associations
User.belongsToMany(Post, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'user_id',
});

Post.belongsToMany(User, {
  through: Like,
  as: 'liked_posts',
  foreignKey: 'post_id',
});

User.hasMany(Like, {
  foreignKey: 'user_id',
});

Post.hasMany(Like, {
  foreignKey: 'post_id',
});

//define Comment's associations
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Like, Comment };
