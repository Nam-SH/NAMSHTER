module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Blog.associate = (db) => {
    db.Blog.belongsTo(db.User) //UserId
    // db.Blog.hasMany(db.Comment)
    // db.Post.hasMany(db.Image)
    db.Blog.belongsToMany(db.User, {
      through: 'BlogLike',
      as: 'BlogLikers'
    })
  };
  return Blog;
};