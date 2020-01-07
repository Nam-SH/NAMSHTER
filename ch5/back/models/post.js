module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    } // createdAt, updatedAt은 자동생성됨 // User 정보도 자동 저장됨
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User) //UserId
    db.Post.hasMany(db.Comment)
    db.Post.hasMany(db.Image)
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' })
    db.Post.belongsTo(db.Post, { as: 'Retweet' })
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' })
  };
  return Post;
};