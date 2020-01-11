const express = require('express');
const cors = require('cors');

const db = require('./models');
const app = express();

const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');

// db 강제로 덮어씌우기
// db.sequelize.sync({force: true})
db.sequelize.sync();
passportConfig();

app.use(morgan('dev'))
app.use(cors({
  origin: 'http://localhost:3081',
  credentials: true,
}));

// 정적파일 사용 => 서버에서 정확한 위치를 보이지 않이 위해, 단순히 / 로 요청을 받게 한다.
app.use('/', express.static('uploads'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookie('cookiesecret'))
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cookiesecret',
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));

app.use(passport.initialize())
app.use(passport.session())

// 메인페이지를 가져오는 것
app.get('/', (req, res) => {
  res.status(200).send('여기는 백엔드');
  // res.send('(수정)여기는 남승현');
})

app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/posts', postsRouter)
app.use('/hashtag', hashtagRouter)


// // 회원가입(signUp)
// app.post('/user', async (req, res, next) => {
//   try {
//     const hash = await bcrypt.hash(req.body.password, 12)

//     // 닉네임을 겹치지 않게 만든다.
//     const exUser = await db.User.findOne({
//       where: {
//         email: req.body.email,
//       }
//     })
//     if (exUser) { // 이미 회원가입이 되어있으면
//       // return res.status(403).send('이미 회원가입이 되어있어요')
//       return res.status(403).json({
//         errorCode: 1,
//         message: '이미 회원가입이 되어있어요'
//       })
//     }
//     // const newUser =  await db.User.create({
//     await db.User.create({
//       email: req.body.email,
//       password: hash,
//       nickname: req.body.nickname
//     });
//     // res.status(201).json(newUser) // 성공적으로 생성했다.
//     // 회원가입 후 바로 로그인하기
//     passport.authenticate('local', (err, user, info) => {
//       if (err) {
//         console.log(err)
//         return next(err);
//       } 
//       if (info) {
//         return res.status(401).send(info.reason)
//       }
//       return req.login(user, async (err) => { // 세션마다 사용자 정보 저장
//         if (err) {
//           console.log(err);
//           return next(err)
//         }
//         return res.json(user)
//       });
//     })(req, res, next);

//   } catch (err) {
//     console.log(err);
//     return next(err);
//   }
// })

// // 로그인
// app.post('/user/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       console.log(err)
//       return next(err);
//     } 
//     if (info) {
//       return res.status(401).send(info.reason)
//     }
//     return req.login(user, async (err) => { // 세션마다 사용자 정보 저장
//       if (err) {
//         console.log(err);
//         return next(err)
//       }
//       return res.json(user)
//     });
//   })(req, res, next);
// })

// // 로그아웃
// app.post('/user/logout', (req, res) => {
//   if (req.isAuthenticated()) {
//     req.logout();
//     req.session.destroy();
//     return res.status(200).send('로그아웃 되었습니다.')
//   }
// })


app.listen(3085, () => {
  console.log(`백엔드 서버 ${3085}번 프로에서 작동중...`)
  console.log()
  console.log(`http://localhost:${3085}/`)
})