module.exports = (sequelize, DataTypes) => {
  const GroupPost = sequelize.define('GroupPost', {
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  GroupPost.associate = (db) => {
    db.GroupPost.belongsTo(db.Group);
    db.GroupPost.belongsTo(db.User)
    db.GroupPost.hasMany(db.GroupPostImage)
    db.GroupPost.belongsToMany(db.User, {
      through: "GroupPostLike",
      as: "GroupPostLiker"
    })
  };
  return GroupPost;
};