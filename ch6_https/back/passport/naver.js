const passport = require('passport');
const NaverStrategy = require("passport-naver").Strategy;
const db = require('../models');
const bcrypt = require('bcrypt');

const naverKey = {
  clientID: "QKT07MaQAc9q37sQ8N3S",
  clientSecret: "LFx0_PLxaP",
  callbackURL: process.env.NODE_ENV === "production" ? "https://api.namshter.com/user/naver/callback" : "http://localhost:3085/user/naver/callback"
}

function makeId() {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

module.exports = () => {
  passport.use(
    new NaverStrategy(naverKey, async (accessToken, refreshToken, profile, done) => {
      try {
        const hash = await bcrypt.hash(makeId(), 12);
        const exUser = await db.User.findOne({
          where: {
            snsId: profile.id,
            provider: 'naver'
          }
        });
        if (exUser) {
          return done(null, exUser);
        }
        const newUser = await db.User.create({
          email: profile._json.email,
          name: profile.displayName,
          nickname: profile.displayName,
          snsId: profile.id,
          provider: profile.provider,
          password: hash
        })

        return done(null, newUser)
      } catch (err) {
        console.error('NaverStrategy :::', err);
        return done(err)
      }
    })
  );
}