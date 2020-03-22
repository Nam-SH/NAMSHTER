module.exports = (sequelize, DataTypes) => {
  const NoticeComment = sequelize.define(
    'NoticeComment', {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  )
  NoticeComment.associate = db => {
    db.NoticeComment.belongsTo(db.Notice)
  }
  return NoticeComment
}