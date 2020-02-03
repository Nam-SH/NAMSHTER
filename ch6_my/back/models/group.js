module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING(40), // 40자 이내
      allowNull: false, // 필수
      unique: true, // 중복금지
    },
    intro: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    master: {
      type: DataTypes.ARRAY(),
      defaultValue: true,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장돼요
  });

  Group.associate = (db) => {
    // db.User.belongsToMany(db.User, 
    //   { through: 'Follow', as: 'Followers', foreignKey: 'followingId' })

    // db.Group.belongsToMany(db.User, { through: 'Grouplike', as: 'Liker' })
        // db.User.belongsToMany(db.Group, { through: 'Grouplike', as: 'Liked' })

    // db.Group.hasMany(db.Grouppost)
        // db.Grouppost.belongsTo(db.Group)

    // db.Group.belongsToMany(db.User, { through: 'Groupuser' })
        // db.User.belongsToMany(db.Group, { through: 'Groupuser' })
  };
  
  return Group;
};