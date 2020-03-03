module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group", {
      name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
      },
      intro: {
        type: DataTypes.STRING(300),
        allowNull: false
      },
      limit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      state: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      src: {
        type: DataTypes.STRING(200),
        defaultValue: "group.jpg",
      },
    }, {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci"
    }
  );

  Group.associate = db => {
    db.Group.belongsToMany(db.Subject, {
      through: "GroupSubject",
      as: "Selectsubject"
    })
    db.Group.belongsToMany(db.User, {
      through: "Groupuser",
      as: "Groupmembers",
    });
    db.Group.belongsTo(db.User, {
      as: "Master"
    });
    db.Group.hasMany(db.GroupPost);
  };
  return Group;
};