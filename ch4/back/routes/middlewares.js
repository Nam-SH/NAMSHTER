exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    // next에 인수를 입력하게 되면 에러로 넘어감
    // 따라서 다음 미들웨어로 넘어가고 싶다면, 인자를 쓰면 안된다.
    console.log('나 로그인 되어있음요')
    return next();
  }
  // 로그인이 되어있다면...
  return res.status(401).send('로그인이 필요해요;;')
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log('로그인 ㄴㄴ임;;')
    return next();
  }
  // 로그인이 되어있지 않다면...
  return res.status(401).send('로그인하면 이용못해요;;')
}