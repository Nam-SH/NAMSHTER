module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    followingId: {
      type: DataTypes.INTEGER,
    },
    followerId: {
      type: DataTypes.INTEGER,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장돼요
  });

  Follow.associate = (db) => {

  };
  return Follow;
};