module.exports = (sequelize, DataTypes) => {
  const DailyTz = sequelize.define(
    "DailyTz", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
    }, {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  DailyTz.associate = db => {
    db.DailyTz.belongsToMany(db.User, {
      through: "DailyUser",
      as: "CheckedUser",
    });
  };

  return DailyTz;
};