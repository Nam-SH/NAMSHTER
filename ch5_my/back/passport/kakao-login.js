const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
 
// passport.use(new KakaoStrategy({
//     clientID : ad2c1b7bc2092839a513110840c5ee81,
//     clientSecret: jXyRyUUES4gFF8ga0oQJgKtvdPikTQLl, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
//     callbackURL : 'http://localhost:3081/api/auth/kakao/callback'
//   },
//   (accessToken, refreshToken, profile, done) => {
//     // 사용자의 정보는 profile에 들어있다.
//     User.findOrCreate(..., (err, user) => {
//       if (err) { return done(err) }
//       return done(null, user)
//     })
//   }
// ))


const kakaoKey = {
  clientID : ad2c1b7bc2092839a513110840c5ee81,
    clientSecret: jXyRyUUES4gFF8ga0oQJgKtvdPikTQLl, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
    callbackURL : 'http://localhost:3081/api/auth/kakao/callback'
};

module.exports = () => {
  passport.use(
    "kakao-login",
    new KakaoStrategy(kakaoKey, (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const NewUserId = "kakao:" + profile.id;
      const NewUserPassword = sha256.x2(NewUserId);
      //해당 id를 가진 user가 존재하는지 찾아본다.
      const sql = "select * from user where username = ?";
      const post = [NewUserId];
      conn.query(sql, post, (err, results, fields) => {
        if (err) {
          console.log(err);
          done(err);
        }
        //만약 해당 유저가 존재하지 않는다면,
        //새로운 아이디를 하나 만들어주고 로그인을 시켜줌.
        if (results.length === 0) {
          const sql = "INSERT user(username, password) values(?,?)";
          const post = [NewUserId, NewUserPassword];
          conn.query(sql, post, (err, results, fields) => {
            if (err) {
              console.log(err);
              done(err);
            }
            //가입이 되었다면 해당 유저로 바로 로그인시켜줌
            const sql = "SELECT * FROM user where username =?";
            const post = [NewUserId];
            conn.query(sql, post, (err, results, fields) => {
              if (err) {
                console.log(err);
                done(err);
              }
              const user = results[0];
              return done(null, user);
            });
          });
        } else {
          //이미 유저가 존재한다면 바로 로그인시켜줌.
          const user = results[0];
          return done(null, user);
        }
      });
    })
  );
}