module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Subject.associate = (db) => {
    db.Subject.belongsTo(db.Category)
    db.Subject.belongsToMany(db.Group, {
      through: "IncludedGroup",
    })
  };

  return Subject;
};