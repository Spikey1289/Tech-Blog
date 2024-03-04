const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   notEmpty: {
      //     args: true,
      //     msg: 'required',
      //   },
      // },
    },
    post_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      // validate: {
        // notEmpty: {
        //   args: true,
        //   msg: 'required',
        // },
        // len: {
        //   args: [1, 2000],
        //   msg: 'message length between 1-2000 please',
        // },
      // },
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
    modelName: 'blogpost',
  }
);

module.exports = BlogPost;