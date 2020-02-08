module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group", {
      name: {
        type: DataTypes.STRING(40), // 40자 이내
        allowNull: false, // 필수
        unique: true // 중복금지
      },
      intro: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      }
    }, {
      charset: "utf8",
      collate: "utf8_general_ci" // 한글 저장돼요
    }
  );

  Group.associate = db => {
    db.Group.belongsToMany(db.User, {
      through: "Groupuser"
    });
    db.Group.belongsTo(db.User);
    db.Group.hasMany(db.Grouppost);
  };

  return Group;
};