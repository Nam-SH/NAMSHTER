module.exports = (sequelize, DataTypes) => {
  const Daily = sequelize.define(
    "Daily", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      checkDate: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    }, {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  Daily.associate = db => {
    db.Daily.belongsToMany(db.User, {
      through: "Daily",
      as: "userId",
    });
  };

  return Daily;
};