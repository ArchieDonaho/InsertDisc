//import model class and datatypes object
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create post model
class Post extends Model {
  // define the like feature
  static like(body, models) {
    return models.Like.create({
      user_id: body.user_id,
      post_id: body.post_id,
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          'id',
          'title',
          'content',
          'created_at',
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM like WHERE post.id = like.post_id)'
            ),
            'like_count',
          ],
        ],
      });
    });
  }
}

// define post columns
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    catagory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
