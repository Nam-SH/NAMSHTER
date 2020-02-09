const passport = require('passport');
const KakaoStrategy = require("passport-kakao").Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

const kakaoKey = {
  clientID: "52e89e9bfe5dc7d3109aebab55307f78",
  clientSecret: "WNt7JvfeNXuixPipmMdC8v48xjJROUtI",
  callbackURL: "http://localhost:3085/user/kakao/callback"
}

function makeid() {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

module.exports = () => {
  passport.use(
    new KakaoStrategy(kakaoKey, async (accessToken, refreshToken, profile, done) => {
      try {
        const exUser = await db.User.findOne({
          where: {
            snsId: profile.id,
            provider: 'kakao'
          }
        });
        if (exUser) {
          return done(null, exUser);
        }
        const hash = await bcrypt.hash(makeid(), 12);
        const newUser = await db.User.create({
          email: profile._json.kakao_account.email,
          name: profile.username,
          nickname: profile.username,
          snsId: profile.id,
          provider: profile.provider,
          password: hash
        })

        return done(null, newUser)
      } catch (err) {
        console.error('KakaoStrategy :::', err);
        return done(err)
      }
    })
  );
}