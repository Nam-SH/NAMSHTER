module.exports = (sequelize, DataTypes) => {
  const GroupPost = sequelize.define('GroupPost', {
    title: {
      type: DataTypes.STRING(40),
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

  };
  return GroupPost;
};