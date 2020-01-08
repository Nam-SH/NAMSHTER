const passport = require('passport');
const local = require('./local');
const db = require('../models');;

module.exports = () => {
  
  // user ID를 클라이언트한테 쿠키로 보낸다.
  passport.serializeUser((user, done) => {
    return done(null, user.id)
  });

  // 쿠키로 인증 성공/실패시 처리
  passport.deserializeUser( async (id, done) => {
    try {
      const user = await db.User.findOne({ where: { id } });
      return done(null, user);
    } catch(err) {
      console.error(err);
      return done(err);
    }
  });
  local();
}