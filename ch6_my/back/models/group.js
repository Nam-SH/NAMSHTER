module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });

  Group.associate = (db) => {
    db.Group.belongsToMany(db.User, { through: 'GroupUser' })
  }

  return Group;
};