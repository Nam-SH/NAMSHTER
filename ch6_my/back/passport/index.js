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
        attributes: ['id', 'nickname', 'name', 'isAdmin', 'snsId', 'provider'],
        include: [{
          model: db.Post,
          attributes: ['id'],
        }, {
          model: db.User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: db.User,
          as: 'Followers',
          attributes: ['id'],
        }, {
          model: db.Comment,
          attributes: ['id'],
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