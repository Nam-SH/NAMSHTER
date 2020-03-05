module.exports = (sequelize, DataTypes) => {
  const GroupPostComment = sequelize.define('GroupPostComment', {
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  GroupPostComment.associate = (db) => {
    db.GroupPostComment.belongsTo(db.Group)
    db.GroupPostComment.belongsTo(db.GroupPost)
    db.GroupPostComment.belongsTo(db.User)
  };
  return GroupPostComment
}