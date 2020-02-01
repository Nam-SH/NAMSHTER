module.exports = (sequelize, DataTypes) => {
  const Groupcomment = sequelize.define('Groupcomment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Groupcomment.associate = (db) => {
    db.Groupcomment.belongsTo(db.Grouppost)
    db.Groupcomment.belongsTo(db.User)
  };
  
  return Groupcomment;
};