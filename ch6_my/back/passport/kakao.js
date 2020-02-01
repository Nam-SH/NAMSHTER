const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../models');

const { Strategy: KakaoStrategy } = require("passport-kakao");

const kakaoKey = {
  clientID: " ad2c1b7bc2092839a513110840c5ee81",
  clientSecret: "8W0pbkRVEeU9rxY9gwLjSD6VKZuwu1yX",
  callbackURL: "http://localhost:3081/login/kakao_oauth"
};

  
module.exports = () => {
  passport.use(new KakaoStrategy(kakaoKey, 
    async (accessToken, refreshToken, profile, done) => {
      try {
        const exUser = await db.User.find({ 
          where: { 
            snsId: profile.id, 
            provider: 'kakao' }
          });
        if (exUser) {
          done(null, exUser);
        }
        else {
          const newUser = await db.User.create({
            email: profile._json && profile._json.kaccount_email,
            nickname: profile.displayName,
            snsId: profile.id,
            provider: 'kakao',
          });
          done(null, newUser);
        }
      }
      catch(err) {
        console.error(err);
        done(err);
      }
  }));
};