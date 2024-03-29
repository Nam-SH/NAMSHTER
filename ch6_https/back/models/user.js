module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", {
      email: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      nickname: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      src: {
        type: DataTypes.TEXT,
        defaultValue: "profile.png",
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      snsId: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      provider: {
        type: DataTypes.TEXT,
        defaultValue: null
      }
    }, {
      charset: "utf8",
      collate: "utf8_general_ci" // 한글 저장돼요
    }
  );

  User.associate = db => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {
      through: "Like",
      as: "Liked"
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "followingId"
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "followerId"
    });
    db.User.belongsToMany(db.DailyTz, {
      through: "DailyUser",
      as: "Checking",
    });
    db.User.belongsToMany(db.Group, {
      through: "Groupuser",
      as: "GroupJoined"
    });
    db.User.hasMany(db.GroupPost, {
      as: "CreatePost"
    });
    db.User.belongsToMany(db.Group, {
      through: "GroupLike",
      as: "LikedGroup"
    });
    db.User.belongsToMany(db.GroupPost, {
      through: "GroupPostLike",
      as: "LikedGroupPost"
    });
    db.User.hasMany(db.GroupPostComment);
    db.User.belongsToMany(db.Blog, {
      through: "BlogLike",
      as: "LikedBlog"
    });
    db.User.hasMany(db.Notice)
    db.User.hasMany(db.NoticeComment)
  };
  return User;
};