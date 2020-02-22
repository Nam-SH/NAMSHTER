const passport = require('passport');
const local = require('./local');
const kakao = require('./kakao');
const naver = require('./naver');
const db = require('../models');;

module.exports = () => {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: {
          id
        },
        attributes: ['id', 'nickname', 'name', 'isAdmin'],
        include: [{
          model: db.Post,
          attributes: ['id', 'createdAt'],
        }, {
          model: db.User,
          as: 'Followings',
          attributes: ['id', 'nickname', 'name'],
        }, {
          model: db.User,
          as: 'Followers',
          attributes: ['id', 'nickname', 'name'],
        }, {
          model: db.Comment,
          attributes: ['id'],
        }, {
          model: db.Group,
          as: 'Groupjoined',
          attributes: ['id', 'name', 'status'],
        }],
      });
      return done(null, user); // req.user, req.isAuthenticated() === true,
    } catch (err) {
      console.error('deserializeUser :::', err);
      return done(err);
    }
  });
  local();
  kakao();
  naver();
};