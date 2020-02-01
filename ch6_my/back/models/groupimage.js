module.exports = (sequelize, DataTypes) => {
  const Groupimage = sequelize.define('Groupimage', {
    src: {
      // 주소를 저장한다.
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });

  Groupimage.associate = (db) => {
    db.Groupimage.belongsTo(db.Grouppost)
  }

  return Groupimage;
};