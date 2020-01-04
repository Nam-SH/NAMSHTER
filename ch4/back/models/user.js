module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(40), // 40자 이내
      allowNull: false // 필수
    },
    nickname: {
      type: DataTypes.STRING(20), // 20자 이내
      allowNull: false // 필수
    },
    password: {
      type: DataTypes.STRING(50), // 50자 이내
      allowNull: false // 필수
    }, 
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장됨

  });

  User.associate = (db) => {

  };

  return User;
}