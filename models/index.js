const User = require('./User');
const Post = require('./Post');
const Likes = require('./Likes');
const Comment = require('./Comment');

//define user/post associations
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//define like's associations
User.belongsToMany(Post, {
  through: Likes,
  as: 'liked_posts',
  foreignKey: 'user_id',
});

Post.belongsToMany(User, {
  through: Likes,
  as: 'liked_posts',
  foreignKey: 'post_id',
});

User.hasMany(Likes, {
  foreignKey: 'user_id',
});

Post.hasMany(Likes, {
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

module.exports = { User, Post, Likes, Comment };
