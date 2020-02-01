module.exports = (sequelize, DataTypes) => {
  const Grouppost = sequelize.define('Grouppost', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Grouppost.associate = (db) => {
    db.Grouppost.belongsTo(db.User);
    
    db.Grouppost.belongsTo(db.Group);
    db.Grouppost.hasMany(db.Groupcomment);
    db.Grouppost.hasMany(db.Groupimage);
  };
  return Grouppost;
};
