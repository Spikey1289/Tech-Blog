const User = require('./User');
const BlogPost = require('./Post');
const Comment = require('./Comment')

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

BlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'post_id',
});

module.exports = {User, BlogPost, Comment};