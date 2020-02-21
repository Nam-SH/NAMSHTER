module.exports = (sequelize, DataTypes) => {
  const Grouppost = sequelize.define('Grouppost', {
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

  Grouppost.associate = (db) => {
    db.Grouppost.belongsTo(db.Group);
    db.Grouppost.belongsTo(db.User)

  };
  return Grouppost;
};