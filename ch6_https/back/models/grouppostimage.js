module.exports = (sequelize, DataTypes) => {
  const GroupPostImage = sequelize.define('GroupPostImage', {
    src: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  GroupPostImage.associate = (db) => {
    db.GroupPostImage.belongsTo(db.GroupPost)
  }

  return GroupPostImage;
};