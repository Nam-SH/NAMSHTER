module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define(
    "Notice", {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  )
  Notice.associate = db => {
    db.Notice.belongsTo(db.User)
    db.Notice.hasMany(db.NoticeComment)
  }
  return Notice;
}