module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(40), // 40자 이내
      allowNull: false, // 필수
      unique: true, // 중복금지
    },
    name: {
      type: DataTypes.STRING(20),
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장돼요
  });

  User.associate = (db) => {
    db.User.hasMany(db.Post)
    db.User.hasMany(db.Comment)

    db.User.belongsToMany(db.Post, {
      through: 'Like',
      as: 'Liked'
    })

    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followers',
      foreignKey: 'followingId'
    })
    db.User.belongsToMany(db.User, {
      through: 'Follow',
      as: 'Followings',
      foreignKey: 'followerId'
    })
    db.User.belongsToMany(db.Group, {
      through: "Groupuser",
      as: 'Groupjoined',
    });
    db.User.hasMany(db.Grouppost)
  };
  return User;
};