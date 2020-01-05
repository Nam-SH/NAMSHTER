const passport = require('passport');
const db = require('../models')
const bcrypt = require('bcrypt')
const { Strategy: LocalStrategy } = require('passport-local')


module.exports = () => {
  passport.serializeUser(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try { 
      // 검사 부분
      const exUser = await db.User.findOne({
        where: {
          email: require.body.email,
        }
      });
      if (!exUser) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' })
      }
      
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        return done(null, exUser);
      } else {
        return done(null, false, { reason: '비밀번호가 틀립니다.' })
      }

    } catch (err) {
      console.log(err)
      return done(err)
    }
  }))
}