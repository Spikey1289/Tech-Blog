const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'required',
        },
      },
    },
    post_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'blogpost',
        key: 'id',
        allowNull: false,
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'required',
        },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        allowNull: false,
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'required',
        },
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;