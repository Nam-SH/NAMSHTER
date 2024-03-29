const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.follow = require('./follow')(sequelize, Sequelize);

db.Category = require('./category')(sequelize, Sequelize);
db.Subject = require('./subject')(sequelize, Sequelize);
db.Group = require('./group')(sequelize, Sequelize);
db.GroupPost = require('./grouppost')(sequelize, Sequelize);
db.GroupPostImage = require('./grouppostimage')(sequelize, Sequelize);
db.GroupPostComment = require('./grouppostcomment')(sequelize, Sequelize);
db.DailyTz = require('./dailytz')(sequelize, Sequelize);

db.Notice = require('./notice')(sequelize, Sequelize);
db.NoticeComment = require('./noticecomment')(sequelize, Sequelize);
db.Blog = require('./blog')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;